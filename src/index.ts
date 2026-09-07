// export * from "./core/engine";
// export * from "./core/renderer";
// export * from "./core/renderEvents";
// export * from "./core/camera";
// export * from "./core/cameraController";
// export * from "./math/vector2";
// export * from "./math/vector3";
// export * from "./math/quaternion";
// export * from "./math/matrix";
// export * from "./math/util";
// export * from "./graphics/mesh";

import { MeshBuilder } from "./graphics/mesh";
import { OrthographicCamera, PerspectiveCamera } from "./core/camera";
import { Engine } from "./core/engine";
import { Backends } from "./core/renderer";
import { Transform } from "./math/transform";
import { Vector3 } from "./math/vector3";
import { Quaternion } from "./math/quaternion";
import { MaterialBuilder } from "./graphics/material";
import { TextureBuilder } from "./graphics/texture";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const engine = new Engine(canvas, { backend: Backends.WEBGL });

const myMesh = engine.createMesh(MeshBuilder.Box(1, 1, 1));
const myTransform = new Transform();

const rock = MaterialBuilder.create({
	albedo: [1, 1, 1, 1],
	roughness: 1,
	metallic: 0,
	ambientOcclusion: 0,
	albedoTexture: engine.createTexture(
		await TextureBuilder.fromURL(
			"/src/assets/textures/ravine-cliff_albedo.png",
		),
	),
	normalTexture: engine.createTexture(
		await TextureBuilder.fromURL(
			"/src/assets/textures/ravine-cliff_normal.png",
		),
	),
	ormTexture: engine.createTexture(
		await TextureBuilder.fromURL("/src/assets/textures/ravine-cliff_orm.png"),
	)
});

const metal = MaterialBuilder.create({
	albedo: [1, 1, 1, 1],
	roughness: 0.7,
	metallic: 1,
	ambientOcclusion: 1,
	albedoTexture: engine.createTexture(
		await TextureBuilder.fromURL("/src/assets/textures/steelplate1_albedo.png"),
	),
	normalTexture: engine.createTexture(
		await TextureBuilder.fromURL("/src/assets/textures/steelplate1_normal.png"),
	),
	ormTexture: engine.createTexture(
		await TextureBuilder.fromURL("/src/assets/textures/steelplate1_orm.png"),
	)
});

const hexagon = MaterialBuilder.create({
	albedo: [1, 1, 1, 1],
	roughness: 0.7,
	metallic: 1,
	ambientOcclusion: 0,
	albedoTexture: engine.createTexture(
		await TextureBuilder.fromURL(
			"/src/assets/textures/futuristic-hex-armor_albedo.png",
		),
	),
	normalTexture: engine.createTexture(
		await TextureBuilder.fromURL(
			"/src/assets/textures/futuristic-hex-armor_normal.png",
		),
	),
	ormTexture: engine.createTexture(
		await TextureBuilder.fromURL(
			"/src/assets/textures/futuristic-hex-armor_orm.png",
		),
	)
});

const red = MaterialBuilder.create({
	albedo: [1, 0.1, 0.1, 1],
	roughness: 0.1,
	metallic: 1.0,
	ambientOcclusion: 1.0,
});

const green = MaterialBuilder.create({
	albedo: [0.1, 0.8, 0.2, 1],
	roughness: 0.8,
	metallic: 0.0,
	ambientOcclusion: 1.0,
});

const blue = MaterialBuilder.create({
	albedo: [0.1, 0.3, 0.9, 1],
	roughness: 0.35,
	metallic: 0.0,
	ambientOcclusion: 1.0,
});

engine.start();

window.addEventListener("resize", () => {
	engine.resize(window.innerWidth, window.innerHeight);
});

engine.resize(window.innerWidth, window.innerHeight);

const cam = new PerspectiveCamera(70);

engine.setCamera(cam);

engine.onFrame = (renderer, timestamp, delta) => {
	renderer.clear(0, 0, 0, 1);

	myTransform.setRotation(
		Quaternion.fromAxisAngle(
			new Vector3(
				Math.sin(timestamp / 2000),
				Math.sin(timestamp / 4000),
				Math.sin(timestamp / 6000),
			),
			timestamp / 2000,
		),
	);

	myTransform.setPosition(-1.8, -0.9, -2.5);
	renderer.drawMesh(myMesh, hexagon, myTransform);

	myTransform.setPosition(0, -0.9, -2.5);
	renderer.drawMesh(myMesh, metal, myTransform);

	myTransform.setPosition(1.8, -0.9, -2.5);
	renderer.drawMesh(myMesh, rock, myTransform);

	myTransform.setPosition(-1.8, 0.9, -2.5);
	renderer.drawMesh(myMesh, red, myTransform);

	myTransform.setPosition(0, 0.9, -2.5);
	renderer.drawMesh(myMesh, green, myTransform);

	myTransform.setPosition(1.8, 0.9, -2.5);
	renderer.drawMesh(myMesh, blue, myTransform);
};
