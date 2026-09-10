import { NotificationType } from "./notifications/notification";
import { notificationDaemon } from "./notifications/notificationDaemon";

export * from "./core/engine";
export * from "./core/renderer";
export * from "./core/renderEvents";
export * from "./core/camera";
export * from "./core/cameraController";
export * from "./math/vector2";
export * from "./math/vector3";
export * from "./math/quaternion";
export * from "./math/matrix";
export * from "./math/util";
export * from "./graphics/mesh";
export * from "./console";

notificationDaemon.create(
  "EasyGFX",
  "Library loaded successfully!",
  NotificationType.Info,
);
