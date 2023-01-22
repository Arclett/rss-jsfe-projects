import { ICar, IDrive } from "../types/interfaces";
import { RenderCar } from "./rendering/_RenderCar";
import { EngineStatus, Responses } from "../types/enums";
import { API } from "./_API";

export class Car extends API {
    container: HTMLElement;
    carData: ICar;
    carLogo: HTMLElement;
    driveResponse: Responses;
    start: number = 0;
    time: number;
    engineStatus: EngineStatus;

    constructor(container: HTMLElement, car: ICar) {
        super();
        this.container = container;
        this.carData = car;
    }

    initCar() {
        this.carLogo = RenderCar.renderCar(this.container, this.carData.name, this.carData.id, this.carData.color);
    }

    async carStart() {
        const res: IDrive = await this.engineStatusApi(EngineStatus.started, this.carData).then((res) => res.json());
        this.engineStatus = EngineStatus.started;
        console.log("started");
        this.time = res.distance / res.velocity;
        window.requestAnimationFrame(this.animate.bind(this));
        this.driveResponse = await this.engineStatusApi(EngineStatus.drive, this.carData).then((res) => res.status);
        this.engineStatus = EngineStatus.stopped;
        console.log("stopped");
        if (this.driveResponse === 200) return { carId: this.carData.id, time: +this.timeToSec(this.time) };
        return Promise.reject();
    }

    async carStop() {
        await this.engineStatusApi(EngineStatus.stopped, this.carData);
        console.log("stop");
        this.engineStatus = EngineStatus.stopped;
        this.carLogo.style.transform = "translateX(0)";
        this.start = 0;
    }

    animate(timestamp: number = 0) {
        if (this.engineStatus === EngineStatus.stopped) {
            console.log("stopped");
            return;
        }
        if (!this.start) this.start = timestamp;

        const progress = timestamp - this.start;
        const path = (progress / this.time) * this.raceWidth;

        this.carLogo.style.transform = `translateX(${path}vw)`;

        if (progress < this.time && this.driveResponse !== Responses.failure) {
            window.requestAnimationFrame(this.animate.bind(this));
        }
    }
}
