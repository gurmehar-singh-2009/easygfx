export enum NotificationType {
  Info,
  Warning,
  Alert,
  Panic,
}

export class Notification {
  public readonly duration: number = 5000;
  private readonly accentColor: string;

  private destroyed: boolean = false;

  // dom system
  private domContainer: HTMLElement = document.createElement("div");
  private titleElm: HTMLElement = document.createElement("div");
  private descElm: HTMLElement = document.createElement("div");
  private lifetimeElm: HTMLElement = document.createElement("div");
  private closeElm: HTMLElement = document.createElement("button");

  constructor(
    private readonly title: string = "",
    private readonly description: string = "",
    private readonly notificationType: NotificationType = NotificationType.Info,
    private readonly parent: HTMLElement = document.body,
  ) {
    this.accentColor = this.getColor();

    this.domContainer.className = "notification-container";

    this.titleElm.className = "notification-title";
    this.descElm.className = "notification-description";
    this.lifetimeElm.className = "notification-lifetime";
    this.closeElm.className = "notification-close";

    this.titleElm.textContent = this.title;
    this.descElm.textContent = this.description;
    this.closeElm.textContent = "×";
    this.closeElm.setAttribute("aria-label", "Dismiss notification");
    this.closeElm.addEventListener("click", () => this.destroy());

    this.domContainer.style.setProperty("--accent-color", this.accentColor);

    this.domContainer.style.setProperty("--lifetime", `${this.duration}ms`);

    this.domContainer.appendChild(this.closeElm);
    this.domContainer.appendChild(this.titleElm);

    if (this.description) {
      this.domContainer.appendChild(this.descElm);
    }

    this.domContainer.appendChild(this.lifetimeElm);

    this.parent.appendChild(this.domContainer);
  }

  public destroy(
    onBeforeRemove?: () => void,
    onExitComplete?: () => void,
  ): void {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    this.domContainer.classList.add("notification-exit");

    this.domContainer.addEventListener(
      "animationend",
      () => {
        onBeforeRemove?.();
        this.domContainer.remove();
        onExitComplete?.();
      },
      { once: true },
    );
  }

  public isDestroyed(): boolean {
    return this.destroyed;
  }

  public getRect(): DOMRect {
    return this.domContainer.getBoundingClientRect();
  }

  public playReflow(fromRect: DOMRect): void {
    if (this.destroyed) {
      return;
    }

    const toRect = this.domContainer.getBoundingClientRect();
    const deltaY = fromRect.top - toRect.top;

    if (Math.abs(deltaY) < 1) {
      return;
    }

    this.domContainer.style.transition = "none";
    this.domContainer.style.transform = `translateY(${deltaY}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.destroyed) {
          return;
        }

        this.domContainer.style.transition =
          "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        this.domContainer.style.transform = "translateY(0)";

        this.domContainer.addEventListener(
          "transitionend",
          () => {
            this.domContainer.style.transition = "";
            this.domContainer.style.transform = "";
          },
          { once: true },
        );
      });
    });
  }

  private getColor(): string {
    switch (this.notificationType) {
      case NotificationType.Info:
        return "#3b82f6";

      case NotificationType.Warning:
        return "#f59e0b";

      case NotificationType.Alert:
        return "#f97316";

      case NotificationType.Panic:
        return "#ff0000";

      default:
        return "#3b82f6";
    }
  }
}
