export interface TextureData {
	source: HTMLImageElement | ImageBitmap | OffscreenCanvas;
}

export interface Texture {
	textureId: number;
}


export class TextureBuilder {
    public static fromSource(source: HTMLImageElement | ImageBitmap | OffscreenCanvas): TextureData {
        return { source };
    }

    public static async fromURL(url: string): Promise<TextureData> {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        await img.decode();
        return { source: img };
    }

    public static SolidColor(r: number, g: number, b: number, a = 255): TextureData {
        const canvas = new OffscreenCanvas(1, 1);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        ctx.fillRect(0, 0, 1, 1);
        return { source: canvas };
    }
}