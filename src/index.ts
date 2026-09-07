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

const rock = engine.createMaterial(
    MaterialBuilder.create({
		albedo: [1, 1, 1, 1],
		roughness: 1,
		metallic: 0,
		ambientOcclusion: 0,
		albedoTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/ravine-cliff_albedo.png")),
		normalTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/ravine-cliff_normal.png")),
		ormTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/ravine-cliff_orm.png")),
		heightTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/ravine-cliff_height.png"))
	})
);

const metal = engine.createMaterial(
    MaterialBuilder.create({
		albedo: [1, 1, 1, 1],
		roughness: 0.7,
		metallic: 1,
		ambientOcclusion: 1,
		albedoTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/steelplate1_albedo.png")),
		normalTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/steelplate1_normal.png")),
		ormTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/steelplate1_orm.png")),
		heightTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/steelplate1_height.png"))
	})
);

const hexagon = engine.createMaterial(
    MaterialBuilder.create({
		albedo: [1, 1, 1, 1],
		roughness: 0.7,
		metallic: 1,
		ambientOcclusion: 0,
		albedoTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/futuristic-hex-armor_albedo.png")),
		normalTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/futuristic-hex-armor_normal.png")),
		ormTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/futuristic-hex-armor_orm.png")),
		heightTexture: engine.createTexture(await TextureBuilder.fromURL("/src/assets/textures/futuristic-hex-armor_height.png"))
	})
);


engine.start();

window.addEventListener("resize", () => {
	engine.resize(window.innerWidth, window.innerHeight);
});

engine.resize(window.innerWidth, window.innerHeight);

const cam = new PerspectiveCamera();

engine.setCamera(cam);

engine.onFrame = (renderer, timestamp, delta) => {
	renderer.clear(0, 0, 0, 1);

	//myTransform.setPosition(Math.sin(timestamp / 200) * 3, 0, -7);
	//myTransform.setScale(new Vector3(1, 1, 1));
	myTransform.setRotation(Quaternion.fromAxisAngle(new Vector3(Math.sin(timestamp / 2000), Math.sin(timestamp / 4000), Math.sin(timestamp / 6000)), timestamp / 2000));

	myTransform.setPosition(1.8, 0, -2.5);
	renderer.drawMesh(myMesh, rock, myTransform);

	myTransform.setPosition(0, 0, -2.5);
	renderer.drawMesh(myMesh, metal, myTransform);

	myTransform.setPosition(-1.8, 0, -2.5);
	renderer.drawMesh(myMesh, hexagon, myTransform);

	// renderer.drawCircle(-2, -2, 1, -10);
	// renderer.drawTriangle(
	// 	2,
	// 	Math.sin(timestamp / 2000) * 2 + 1,
	// 	-0.5,
	// 	Math.sin(timestamp / 2000) + 1,
	// 	Math.sin(timestamp / 2000),
	// 	-1,
	// 	-10,
	// );
};
