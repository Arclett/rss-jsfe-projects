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
        window.stop();
        const data = await this.getCars(this.currentPage);
        if (!data.total) return;
        this.carTotal = Number(data.total);
        this.garageElems.garageTitle.textContent = `Garage (${data.total})`;
        this.garageElems.pageNumber.textContent = `Page ${this.currentPage}`;

        this.garageElems.raceWrapper.replaceChildren();
        this.carElems = data.cars.map((e) => new Car(this.garageElems.raceWrapper, e));
        this.carElems.forEach((e) => e.initCar());
        this.garageElems.race.disabled = false;
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

        await car.carStart().then(
            () => {},
            () => {}
        );
    }

    async stopEngine(id: string) {
        const car = this.carElems.find((e) => e.carData.id === Number(id));
        if (!car) return;
        return await car.carStop();
    }

    async race() {
        this.garageElems.race.disabled = true;
        const data = await Promise.any(this.carElems.map((e) => e.carStart()));
        console.log("data", data);
        if (!data) return;
        const { carId: winner, time: time } = data;
        const carName = this.carElems.reduce((acc, e) => {
            if (e.carData.id === winner) acc = e.carData.name;
            return acc;
        }, "");
        this.winMessage(carName, time);
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

    winMessage(car: string, time: number) {
        console.log("winner");
        const win = document.createElement("div");
        win.className = "winner-message";
        win.textContent = `Winner: ${car}, Time: ${time}`;

        this.garageElems.raceWrapper.appendChild(win);
    }
}
