import { Notification, NotificationType } from "./notification";

class NotificationDaemon {
  private currentNotificationId: number = 0;
  private activeNotifications: Array<[number, Notification]> = [];

  private readonly domContainer: HTMLElement = document.createElement("div");

  constructor() {
    this.domContainer.className = "notification-host";
    document.body.appendChild(this.domContainer);
  }

  public create(
    name: string,
    description: string,
    type: NotificationType,
  ): void {
    const id = this.currentNotificationId++;
    const notification = new Notification(
      name,
      description,
      type,
      this.domContainer,
    );

    this.activeNotifications.push([id, notification]);

    setTimeout(() => this.removeById(id), notification.duration);
  }

  public dismiss(id: number): void {
    this.removeById(id);
  }

  public clear(): void {
    for (const [, notification] of this.activeNotifications) {
      notification.destroy();
    }

    this.activeNotifications = [];
  }

  private removeById(id: number): void {
    const entry = this.activeNotifications.find((x) => x[0] === id);

    if (!entry || entry[1].isDestroyed()) {
      return;
    }

    const [, target] = entry;

    const survivors = this.activeNotifications
      .filter((x) => x[0] !== id)
      .map(([, n]) => n);

    this.activeNotifications = this.activeNotifications.filter(
      (x) => x[0] !== id,
    );

    let beforeRects: DOMRect[] = [];

    target.destroy(
      () => {
        beforeRects = survivors.map((n) => n.getRect());
      },
      () => {
        survivors.forEach((n, i) => n.playReflow(beforeRects[i]!));
      },
    );
  }
}

import styles from "./style.css" with { type: "text" };
let styleElm = document.createElement("style");
styleElm.textContent = styles;
document.head.appendChild(styleElm);

export const notificationDaemon = new NotificationDaemon();

function loadJetBrainsMonoFont() {
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const stylesheet = document.createElement("link");
  stylesheet.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap";
  stylesheet.rel = "stylesheet";
  document.head.appendChild(stylesheet);
}

loadJetBrainsMonoFont();
