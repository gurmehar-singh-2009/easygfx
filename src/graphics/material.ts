import type { Texture } from "./texture";

export interface Material {
	albedo?: [number, number, number, number];
	roughness?: number;
	metallic?: number;
	ambientOcclusion?: number;
	isUnlit?: number;

	albedoTexture?: Texture;
	normalTexture?: Texture;
	ormTexture?: Texture;
	heightTexture?: Texture;
}

export class MaterialBuilder {
	public static create(params?: {
		albedo?: [number, number, number, number];
		roughness?: number;
		metallic?: number;
		ambientOcclusion?: number;
		isUnlit?: number;
		albedoTexture?: Texture;
		normalTexture?: Texture;
		ormTexture?: Texture;
		heightTexture?: Texture;
	}): Material {
		return {
			albedo: params?.albedo ?? [1, 1, 1, 1],
			roughness: params?.roughness ?? 0.5,
			metallic: params?.metallic ?? 0,
			ambientOcclusion: params?.ambientOcclusion ?? 1,
			isUnlit: params?.isUnlit ?? 0,
			albedoTexture: params?.albedoTexture,
			normalTexture: params?.normalTexture,
			ormTexture: params?.ormTexture,
			heightTexture: params?.heightTexture,
		};
	}
}
