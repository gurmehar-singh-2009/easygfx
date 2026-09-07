import type { Material, MaterialData } from "../graphics/material";
import type { Mesh, MeshData } from "../graphics/mesh";
import type { Texture, TextureData } from "../graphics/texture";
import type { Matrix4 } from "../math/matrix";
import type { Camera } from "./camera";


/** Backends. */
export enum Backends {
	/** Canvas backend. Uses the Canvas2D API. See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API */
	CANVAS,
	/** WebGL backend. Uses the WebGL API. See: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API */
	WEBGL,
	/** WebGPU backend (experimental - very new). Uses the WebGPU API. See: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API */
	WEBGPU,
}

/** Render Configurations. */
export interface RenderConfigs {
	/** Backend type. */
	backend: Backends;
	/** Anti Alias (iirc this just means higher quality) */
	antialias?: boolean;
	/** Debug mode. */
	debug?: boolean;
	// todo
	onError?: (error: Error) => void;
	// default(): RenderConfigs;
}

export interface Backend {
	clear?(r: number, g: number, b: number, a: number): void;

	createTexture(data: TextureData): Texture;
	createMaterial(data: MaterialData): Material;

	createMesh(data: MeshData): Mesh;
	updateMesh(mesh: Mesh, data: MeshData): void;
	drawMesh(mesh: Mesh, material: Material, transformMatrix: Matrix4): void;

	resize?(width: number, height: number): void;
	updateView?(camera: Camera): void;
}
