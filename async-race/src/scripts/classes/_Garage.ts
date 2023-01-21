import { EngineStatus } from "../types/enums";
import { ICar, ICars, IGarageElems } from "../types/interfaces";
import { Car } from "./_Car";
import { Utilities } from "./_Utilities";

export class Garage extends Utilities {
    garageElems: IGarageElems;

    currentPage: number = 1;

    carTotal: number;

    carElems: Car[];

    start: number = 0;

    constructor(garageElems: IGarageElems) {
        super();
        this.garageElems = garageElems;
    }

    async initGarage() {
        const data = await this.getCars(this.currentPage);
        if (!data.total) return;
        this.carTotal = Number(data.total);
        this.garageElems.garageTitle.textContent = `Garage (${data.total})`;
        this.garageElems.pageNumber.textContent = `Page ${this.currentPage}`;

        this.garageElems.raceWrapper.replaceChildren();
        this.carElems = data.cars.map((e) => new Car(this.garageElems.raceWrapper, e));
        this.carElems.forEach((e) => e.initCar());
    }

    async getCars(page: number, limit: number = 7): Promise<ICars> {
        const data = await fetch(`${this.makeURL("garage")}?_page=${page}&_limit=${limit}`);
        const cars: ICar[] = await data.json();
        console.log(cars);
        const count = data.headers.get("X-Total-Count");
        return { cars: cars, total: count };
    }

    async removeCar(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        await fetch(`${this.makeURL("garage")}/${id}`, { method: "DELETE" });
        this.initGarage();
    }

    nextPage(limit: number = 7) {
        if (this.carTotal - this.currentPage * limit <= 0) return;
        this.currentPage++;
        this.initGarage();
    }

    prevPage() {
        if (this.currentPage === 1) return;
        this.currentPage--;
        this.initGarage();
    }

    async runEngine(id: string) {
        console.log(id);
        const car = this.carElems.find((e) => e.carData.id === Number(id));
        if (!car) return;
        console.log(car.carData.id);
        car.carStart();
    }

    animation() {
        const req = window.requestAnimationFrame(this.animate.bind(this));
    }

    animate(timestamp: any = 0) {
        if (!this.start) this.start = timestamp;

        const progress = timestamp - this.start;

        const x = document.querySelector(".car-icon-1");
        console.log(progress);
        if (x instanceof HTMLElement) {
            x.style.transform = `translateX(${progress / 5}px)`;
        }

        if (progress < 2000) {
            window.requestAnimationFrame(this.animate.bind(this));
        }
    }
}
