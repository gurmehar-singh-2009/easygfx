import { NotificationType } from "./notifications/notification";
import { notificationDaemon } from "./notifications/notificationDaemon";

declare global {
  interface Console {
    log2(...args: any[]): void;
    warn2(...args: any[]): void;
    error2(...args: any[]): void;
  }
}

// hook into console calls to also show notifications for them
// see if there is a more concise way to write this
window.console.log2 = new Proxy(window.console.log, {
  apply(target, thisArg, args) {
    notificationDaemon.create(args[0], args[1], NotificationType.Info);

    return Reflect.apply(target, thisArg, args);
  },
});

window.console.warn2 = new Proxy(window.console.warn, {
  apply(target, thisArg, args) {
    notificationDaemon.create(args[0], args[1], NotificationType.Warning);

    return Reflect.apply(target, thisArg, args);
  },
});

window.console.error2 = new Proxy(window.console.error, {
  apply(target, thisArg, args) {
    notificationDaemon.create(args[0], args[1], NotificationType.Alert);

    return Reflect.apply(target, thisArg, args);
  },
});
