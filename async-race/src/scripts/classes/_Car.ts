import { ICar, ICarElements, IDrive } from "../types/interfaces";
import { RenderCar } from "./rendering/_RenderCar";
import { EngineStatus, Responses } from "../types/enums";
import { API } from "./_API";

export class Car extends API {
    container: HTMLElement;

    carData: ICar;

    elements: ICarElements;

    driveResponse: Responses;

    start = 0;

    time: number;

    engineStatus: EngineStatus;

    animationId: number;

    constructor(container: HTMLElement, car: ICar) {
        super();
        this.container = container;
        this.carData = car;
    }

    initCar() {
        this.elements = RenderCar.renderCar(this.container, this.carData.name, this.carData.id, this.carData.color);
    }

    async carStart() {
        this.elements.startButton.disabled = true;
        const resp: IDrive = await this.engineStatusApi(EngineStatus.started, this.carData).then((res) => res.json());
        this.elements.stopButton.disabled = false;
        this.time = resp.distance / resp.velocity;
        this.animationId = window.requestAnimationFrame(this.animate.bind(this));
        this.driveResponse = await this.engineStatusApi(EngineStatus.drive, this.carData).then((res) => res.status);
        if (this.driveResponse === 200) return { carId: this.carData.id, time: +this.timeToSec(this.time) };
        return Promise.reject();
    }

    async carStop() {
        this.elements.stopButton.disabled = true;
        window.cancelAnimationFrame(this.animationId);
        await this.engineStatusApi(EngineStatus.stopped, this.carData);
        this.elements.startButton.disabled = false;
        this.elements.carLogo.style.transform = "translateX(0)";
        this.start = 0;
    }

    animate(timestamp = 0) {
        if (!this.start) this.start = timestamp;
        const progress = timestamp - this.start;
        const path = (progress / this.time) * this.raceWidth;

        this.elements.carLogo.style.transform = `translateX(${path}vw)`;

        if (progress < this.time && this.driveResponse !== Responses.failure) {
            this.animationId = window.requestAnimationFrame(this.animate.bind(this));
        }
    }
}
