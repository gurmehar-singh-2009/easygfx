import type { Texture } from "./texture";

export interface MaterialData {
	albedo?: [number, number, number, number];
	roughness?: number;
	metallic?: number;
	ambientOcclusion?: number;

	albedoTexture?: Texture;
	normalTexture?: Texture;
	ormTexture?: Texture;
	heightTexture?: Texture;
}

export interface Material {
	materialID: number;

    // This is temporary until material GPU upload is implemented.
    materialData: MaterialData;
}

export class MaterialBuilder {
    public static create(params?: {
        albedo?: [number, number, number, number];
        roughness?: number;
        metallic?: number;
        ambientOcclusion?: number;
        albedoTexture?: Texture;
        normalTexture?: Texture;
        ormTexture?: Texture;
        heightTexture?: Texture;
    }): MaterialData {
        return {
            albedo: params?.albedo ?? [1.0, 1.0, 1.0, 1.0],
            roughness: params?.roughness ?? 0.5,
            metallic: params?.metallic ?? 0.0,
            ambientOcclusion: params?.ambientOcclusion ?? 1.0,
            albedoTexture: params?.albedoTexture,
            normalTexture: params?.normalTexture,
            ormTexture: params?.ormTexture,
            heightTexture: params?.heightTexture,
        };
    }
}