import { ICar, IDrive } from "../types/interfaces";
import { RenderCar } from "./rendering/_RenderCar";
import { Utilities } from "./_Utilities";
import { EngineStatus, Responses } from "../types/enums";

export class Car extends Utilities {
    container: HTMLElement;
    carData: ICar;
    carLogo: HTMLElement;
    driveResponse: Responses;
    start: number = 0;
    time: number;

    constructor(container: HTMLElement, car: ICar) {
        super();
        this.container = container;
        this.carData = car;
    }

    initCar() {
        this.carLogo = RenderCar.renderCar(this.container, this.carData.name, this.carData.id, this.carData.color);
    }

    async engineStatus(status: EngineStatus): Promise<Response> {
        return await fetch(`${this.makeURL("engine")}?id=${this.carData.id}&status=${status}`, {
            method: "PATCH",
        });
    }

    async carStart() {
        const res: IDrive = await this.engineStatus(EngineStatus.started).then((res) => res.json());
        this.time = res.distance / res.velocity;
        this.animation();
        this.driveResponse = await this.engineStatus(EngineStatus.drive).then((res) => res.status);
    }

    animation() {
        const req = window.requestAnimationFrame(this.animate.bind(this));
    }

    animate(timestamp: any = 0) {
        if (!this.start) this.start = timestamp;

        const progress = timestamp - this.start;
        const path = (progress / this.time) * 92;

        this.carLogo.style.transform = `translateX(${path}vw)`;

        if (progress < this.time && this.driveResponse !== Responses.failure) {
            window.requestAnimationFrame(this.animate.bind(this));
        }
    }
}
