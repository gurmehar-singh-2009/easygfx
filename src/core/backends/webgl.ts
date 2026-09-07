import type { RenderConfigs, Backend } from "../renderer";
import { vertexShaderSource } from "../../graphics/shaders/webgl/vertex";
import { fragmentShaderSource } from "../../graphics/shaders/webgl/fragment";
import type { Camera } from "../camera";
import type { MeshData, Mesh } from "../../graphics/mesh";
import { Transform } from "../../math/transform";
import { Matrix4 } from "../../math/matrix";
import { Vector3 } from "../../math/vector3";
import type { Material } from "../../graphics/material";
import type { Texture, TextureData } from "../../graphics/texture";

interface ShaderLocations {
	program: WebGLProgram;
	attributes: {
		position: GLint;
		normal: GLint;
		texCoord: GLint;
		tangent: GLint;
	};
	uniforms: {
		viewProjection: WebGLUniformLocation | null;
		meshTransform: WebGLUniformLocation | null;
		normalMatrix: WebGLUniformLocation | null;

		albedo: WebGLUniformLocation | null;
		pbrProperties: WebGLUniformLocation | null;
		textureIds: WebGLUniformLocation | null;

		textures: WebGLUniformLocation | null;
	};
}

export class WebGLBackend implements Backend {
	configs: RenderConfigs;
	private ctx: WebGL2RenderingContext;
	private shaderLocations!: ShaderLocations;

	private tempNormalMatrix = new Float32Array(9);

	private textureArray!: WebGLTexture;
	private maxTextureLayers = 256;
	private textureSize = 1024;
	private nextTextureId = 0;

	private offscreenCanvas = new OffscreenCanvas(1024, 1024);
	private offscreenCtx = this.offscreenCanvas.getContext("2d")!;

	private nextMaterialId = 0;

	constructor(canvas: HTMLCanvasElement, configs: RenderConfigs) {
		this.configs = configs;

		this.ctx = canvas.getContext("webgl2")!;

		this.ctx.enable(this.ctx.CULL_FACE);
		this.ctx.cullFace(this.ctx.BACK);
		this.ctx.frontFace(this.ctx.CCW);
		this.ctx.enable(this.ctx.BLEND);
		this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
		this.ctx.enable(this.ctx.DEPTH_TEST);

		this.initShaderProgram(vertexShaderSource, fragmentShaderSource);
		this.initTextureArray();

		this.resize(500, 500);
	}

	private initShaderProgram(
		vertexShaderSource: string,
		fragmentShaderSource: string,
	): void {
		const program = this.ctx.createProgram();

		const vertexShader = this.loadShader(
			this.ctx.VERTEX_SHADER,
			vertexShaderSource,
		);
		const fragmentShader = this.loadShader(
			this.ctx.FRAGMENT_SHADER,
			fragmentShaderSource,
		);

		this.ctx.attachShader(program, vertexShader);
		this.ctx.attachShader(program, fragmentShader);
		this.ctx.linkProgram(program);

		if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
			throw new Error(this.ctx.getProgramInfoLog(program) + "");
		}

		this.ctx.detachShader(program, vertexShader);
		this.ctx.detachShader(program, fragmentShader);
		this.ctx.deleteShader(vertexShader);
		this.ctx.deleteShader(fragmentShader);

		this.shaderLocations = {
			program: program,

			attributes: {
				position: this.getAttributeLocation(program, "a_position"),
				normal: this.getAttributeLocation(program, "a_normal"),
				texCoord: this.getAttributeLocation(program, "a_texCoord"),
				tangent: this.getAttributeLocation(program, "a_tangent"),
			},

			uniforms: {
				viewProjection: this.getUniformLocation(program, "u_viewProjection")!,
				meshTransform: this.getUniformLocation(program, "u_meshTransform")!,
				normalMatrix: this.getUniformLocation(program, "u_normalMatrix")!,

				albedo: this.getUniformLocation(program, "u_albedo")!,
				pbrProperties: this.getUniformLocation(program, "u_pbrProperties")!,
				textureIds: this.getUniformLocation(program, "u_textureIds")!,

				textures: this.getUniformLocation(program, "u_textures")!,
			},
		};

		this.ctx.useProgram(program);

		if (this.shaderLocations.uniforms.textures) {
			this.ctx.uniform1i(this.shaderLocations.uniforms.textures, 0);
		}
	}

	private loadShader(type: GLenum, source: string): WebGLShader {
		const shader = this.ctx.createShader(type) as WebGLShader;

		this.ctx.shaderSource(shader, source);
		this.ctx.compileShader(shader);

		if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
			throw new Error("" + this.ctx.getShaderInfoLog(shader));
		}

		return shader;
	}

	private getAttributeLocation(program: WebGLProgram, name: string): GLint {
		const location = this.ctx.getAttribLocation(program, name);
		if (location === -1) {
			console.warn(`Attribute "${name}" not found.`);
		}
		return location;
	}

	private getUniformLocation(
		program: WebGLProgram,
		name: string,
	): WebGLUniformLocation | null {
		const location = this.ctx.getUniformLocation(program, name);
		if (!location) {
			console.warn(`Uniform "${name}" not found.`);
		}
		return location;
	}

	// ---------------------------------------------------------------------

	private initTextureArray(): void {
		this.textureArray = this.ctx.createTexture();

		this.ctx.bindTexture(this.ctx.TEXTURE_2D_ARRAY, this.textureArray);

		const mipLevels = Math.floor(Math.log2(this.textureSize)) + 1;
		this.ctx.texStorage3D(
			this.ctx.TEXTURE_2D_ARRAY,
			mipLevels,
			this.ctx.RGBA8,
			this.textureSize,
			this.textureSize,
			this.maxTextureLayers,
		);

		this.ctx.texParameteri(
			this.ctx.TEXTURE_2D_ARRAY,
			this.ctx.TEXTURE_MIN_FILTER,
			this.ctx.LINEAR_MIPMAP_LINEAR,
		);
		this.ctx.texParameteri(
			this.ctx.TEXTURE_2D_ARRAY,
			this.ctx.TEXTURE_MAG_FILTER,
			this.ctx.LINEAR,
		);
		this.ctx.texParameteri(
			this.ctx.TEXTURE_2D_ARRAY,
			this.ctx.TEXTURE_WRAP_S,
			this.ctx.REPEAT,
		);
		this.ctx.texParameteri(
			this.ctx.TEXTURE_2D_ARRAY,
			this.ctx.TEXTURE_WRAP_T,
			this.ctx.REPEAT,
		);

		this.ctx.bindTexture(this.ctx.TEXTURE_2D_ARRAY, null);
	}

	public createTexture(data: TextureData): Texture {
		const textureId = this.nextTextureId++;

		this.offscreenCtx.clearRect(0, 0, this.textureSize, this.textureSize);
		this.offscreenCtx.drawImage(
			data.source,
			0,
			0,
			this.textureSize,
			this.textureSize,
		);

		this.ctx.bindTexture(this.ctx.TEXTURE_2D_ARRAY, this.textureArray);
		this.ctx.texSubImage3D(
			this.ctx.TEXTURE_2D_ARRAY,
			0,
			0,
			0,
			textureId,
			this.textureSize,
			this.textureSize,
			1,
			this.ctx.RGBA,
			this.ctx.UNSIGNED_BYTE,
			this.offscreenCanvas,
		);
		this.ctx.generateMipmap(this.ctx.TEXTURE_2D_ARRAY);

		return { textureId: textureId };
	}

	// ---------------------------------------------------------------------

	private createVertexData(data: MeshData): {
		vertexData: Float32Array;
		floatsPerVert: number;
	} {
		const vertexCount = data.positions.length / 3;
		const hasNormals = data.normals !== undefined && data.normals.length > 0;
		const hasUVs = data.uvs !== undefined && data.uvs.length > 0;
		const hasTangents = data.tangents !== undefined && data.tangents.length > 0;

		let floatsPerVert = 3;
		if (hasNormals) floatsPerVert += 3;
		if (hasUVs) floatsPerVert += 2;
		if (hasTangents) floatsPerVert += 4;

		const vertexData = new Float32Array(vertexCount * floatsPerVert);

		const positions = data.positions;
		const normals = hasNormals ? data.normals : undefined;
		const uvs = hasUVs ? data.uvs : undefined;
		const tangents = hasTangents ? data.tangents : undefined;

		let offset = 0;
		for (let i = 0; i < vertexCount; i++) {
			vertexData[offset++] = positions[i * 3]!;
			vertexData[offset++] = positions[i * 3 + 1]!;
			vertexData[offset++] = positions[i * 3 + 2]!;

			if (normals) {
				vertexData[offset++] = normals[i * 3]!;
				vertexData[offset++] = normals[i * 3 + 1]!;
				vertexData[offset++] = normals[i * 3 + 2]!;
			}

			if (uvs) {
				vertexData[offset++] = uvs[i * 2]!;
				vertexData[offset++] = uvs[i * 2 + 1]!;
			}

			if (tangents) {
				vertexData[offset++] = tangents[i * 4]!;
				vertexData[offset++] = tangents[i * 4 + 1]!;
				vertexData[offset++] = tangents[i * 4 + 2]!;
				vertexData[offset++] = tangents[i * 4 + 3]!;
			}
		}

		return { vertexData, floatsPerVert };
	}

	public createMesh(data: MeshData): Mesh {
		const { vertexData, floatsPerVert } = this.createVertexData(data);

		const drawType = this.ctx.DYNAMIC_DRAW;
		//const drawType = this.ctx.STATIC_DRAW;

		const vao = this.ctx.createVertexArray()!;
		this.ctx.bindVertexArray(vao);

		const vbo = this.ctx.createBuffer()!;
		this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, vbo);
		this.ctx.bufferData(this.ctx.ARRAY_BUFFER, vertexData, drawType);

		const ebo = this.ctx.createBuffer()!;
		this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, ebo);
		this.ctx.bufferData(this.ctx.ELEMENT_ARRAY_BUFFER, data.indices, drawType);

		const stride = floatsPerVert * Float32Array.BYTES_PER_ELEMENT;
		let offset = 0;

		this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.position);
		this.ctx.vertexAttribPointer(
			this.shaderLocations.attributes.position,
			3,
			this.ctx.FLOAT,
			false,
			stride,
			offset,
		);
		offset += 3 * Float32Array.BYTES_PER_ELEMENT;

		const hasNormals = data.normals !== undefined && data.normals.length > 0;
		if (hasNormals) {
			this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.normal);
			this.ctx.vertexAttribPointer(
				this.shaderLocations.attributes.normal,
				3,
				this.ctx.FLOAT,
				false,
				stride,
				offset,
			);
			offset += 3 * Float32Array.BYTES_PER_ELEMENT;
		}

		const hasUVs = data.uvs !== undefined && data.uvs.length > 0;
		if (hasUVs) {
			this.ctx.enableVertexAttribArray(
				this.shaderLocations.attributes.texCoord,
			);
			this.ctx.vertexAttribPointer(
				this.shaderLocations.attributes.texCoord,
				2,
				this.ctx.FLOAT,
				false,
				stride,
				offset,
			);
			offset += 2 * Float32Array.BYTES_PER_ELEMENT;
		}

		const hasTangents = data.tangents !== undefined && data.tangents.length > 0;
		if (hasTangents) {
			if (
				this.shaderLocations.attributes.tangent !== undefined &&
				this.shaderLocations.attributes.tangent !== -1
			) {
				this.ctx.enableVertexAttribArray(
					this.shaderLocations.attributes.tangent,
				);
				this.ctx.vertexAttribPointer(
					this.shaderLocations.attributes.tangent,
					4,
					this.ctx.FLOAT,
					false,
					stride,
					offset,
				);
			}
		}

		this.ctx.bindVertexArray(null);

		const indexType =
			data.indices instanceof Uint16Array
				? this.ctx.UNSIGNED_SHORT
				: this.ctx.UNSIGNED_INT;

		return {
			vao,
			vbo,
			ebo,
			indexCount: data.indices.length,
			indexType,
		};
	}

	public updateMesh(mesh: Mesh, data: MeshData): void {
		const { vertexData, floatsPerVert } = this.createVertexData(data);

		this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, mesh.vbo);
		this.ctx.bufferSubData(this.ctx.ARRAY_BUFFER, 0, vertexData);
		this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, null);

		this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, mesh.ebo);
		this.ctx.bufferSubData(this.ctx.ELEMENT_ARRAY_BUFFER, 0, data.indices);

		mesh.indexCount = data.indices.length;
		mesh.indexType =
			data.indices instanceof Uint16Array
				? this.ctx.UNSIGNED_SHORT
				: this.ctx.UNSIGNED_INT;
	}

	private bindMaterial(material: Material): void {
		if (this.shaderLocations.uniforms.albedo) {
			const albedo = material.albedo ?? [1, 1, 1, 1];
			this.ctx.uniform4f(
				this.shaderLocations.uniforms.albedo,
				albedo[0],
				albedo[1],
				albedo[2],
				albedo[3] ?? 1,
			);
		}

		if (this.shaderLocations.uniforms.pbrProperties) {
			this.ctx.uniform4f(
				this.shaderLocations.uniforms.pbrProperties,
				material.roughness ?? 0.5,
				material.metallic ?? 0,
				material.ambientOcclusion ?? 1,
				material.isUnlit ?? 0,
			);
		}

		if (this.shaderLocations.uniforms.textureIds) {
			this.ctx.uniform3i(
				this.shaderLocations.uniforms.textureIds,
				material.albedoTexture?.textureId ?? -1,
				material.normalTexture?.textureId ?? -1,
				material.ormTexture?.textureId ?? -1
			);
		}
	}

	public drawMesh(
		mesh: Mesh,
		material: Material,
		transformMatrix: Matrix4,
	): void {
		this.ctx.activeTexture(this.ctx.TEXTURE0);
		this.ctx.bindTexture(this.ctx.TEXTURE_2D_ARRAY, this.textureArray);

		this.bindMaterial(material);

		this.ctx.bindVertexArray(mesh.vao);

		if (this.shaderLocations.uniforms.meshTransform) {
			this.ctx.uniformMatrix4fv(
				this.shaderLocations.uniforms.meshTransform,
				false,
				transformMatrix.data,
			);
		}

		if (this.shaderLocations.uniforms.normalMatrix) {
			const normalMatrixData = Matrix4.normalMatrix(
				transformMatrix,
				this.tempNormalMatrix,
			);
			this.ctx.uniformMatrix3fv(
				this.shaderLocations.uniforms.normalMatrix,
				false,
				normalMatrixData,
			);
		}

		this.ctx.drawElements(
			this.ctx.TRIANGLES,
			mesh.indexCount,
			mesh.indexType,
			0,
		);

		this.ctx.bindVertexArray(null);
	}

	// ---------------------------------------------------------------------

	public clear(r: number, g: number, b: number, a: number): void {
		this.ctx.clearColor(r / 255, g / 255, b / 255, a);
		this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
	}

	public updateView(camera: Camera): void {
		this.ctx.uniformMatrix4fv(
			this.shaderLocations.uniforms.viewProjection,
			false,
			camera.viewProjectionMatrix.data,
		);
	}

	public resize(width: number, height: number): void {
		this.ctx.viewport(0, 0, width, height);
	}
}
