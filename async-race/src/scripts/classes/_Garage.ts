import { Responses } from "../types/enums";
import { ICar, ICars, IGarageElems, IWinnerGet, IWinnerUpdate } from "../types/interfaces";
import { API } from "./_API";
import { Car } from "./_Car";

export class Garage extends API {
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

    async getCars(page: number, limit: number = this.garageLimit): Promise<ICars> {
        const data = await this.getCarsApi(page, limit);
        const cars: ICar[] = await data.json();
        const count = data.headers.get("X-Total-Count");
        return { cars: cars, total: count };
    }

    async removeCar(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        await this.removeCarApi(+id);
        await this.deleteWinnerApi(+id);
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
        const car = this.carElems.find((e) => e.carData.id === Number(id));
        if (!car) return;
        return await car.carStart();
    }

    async stopEngine(id: string) {
        const car = this.carElems.find((e) => e.carData.id === Number(id));
        if (!car) return;
        return await car.carStop();
    }

    async race() {
        const { carId: winner, time: time } = await Promise.any(this.carElems.map((e) => e.carStart()));
        this.updateWinners(winner, time);
    }

    async updateWinners(car: number, timeOfRace: number) {
        const winner: IWinnerGet = await this.getWinnerApi(car).then(
            (res) => res.json(),
            (rej) => rej.status
        );
        if (winner.wins > 0) {
            const data: IWinnerUpdate = {
                wins: ++winner.wins,
                time: winner.time > timeOfRace ? timeOfRace : winner.time,
            };
            await this.updateWinnerApi(data, car);
        } else {
            await this.createWinnerApi(car, timeOfRace);
        }
    }
}
