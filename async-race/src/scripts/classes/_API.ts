import { Utilities } from "./_Utilities";
import { ICarWithId, ICar, IWinnerUpdate } from "../types/interfaces";
import { EngineStatus, Methods, Order, SortType } from "../types/enums";

export class API extends Utilities {
    protected async removeCarApi(id: number) {
        await fetch(`${this.makeURL("garage")}/${id}`, { method: Methods.DELETE });
    }

    protected async getCarsApi(page: number, limit: number) {
        const result = await fetch(`${this.makeURL("garage")}?_page=${page}&_limit=${limit}`);
        return result;
    }

    protected async createCarApi(data: { name: string; color: string }) {
        const result = await fetch(`${this.makeURL("garage")}`, {
            method: Methods.POST,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        return result;
    }

    protected async getCarApi<T>(id: string): Promise<T> {
        const result = await fetch(`${this.makeURL("garage")}/${id}`).then((res) => res.json());
        return result;
    }

    protected async updateCarApi(id: number, data: ICar) {
        const result = await fetch(`${this.makeURL("garage")}/${id}`, {
            method: Methods.PUT,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        return result;
    }

    protected async engineStatusApi(status: EngineStatus, car: ICarWithId): Promise<Response> {
        const result = await fetch(`${this.makeURL("engine")}?id=${car.id}&status=${status}`, {
            method: Methods.PATCH,
        });
        return result;
    }

    protected async createWinnerApi(car: number, time: number) {
        const data = {
            id: car,
            wins: 1,
            time: time,
        };
        const result = await fetch(`${this.makeURL("winners")}`, {
            method: Methods.POST,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        return result;
    }

    protected async getWinnerApi(carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, { method: Methods.GET });
        return result;
    }

    protected async updateWinnerApi(data: IWinnerUpdate, carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, {
            method: Methods.PUT,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        return result;
    }

    protected async getWinnersApi(page: number, sort: SortType, order: Order, limit = this.winnersLimit) {
        const url = `${this.makeURL("winners")}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
        const result = await fetch(url);
        return result;
    }

    protected async deleteWinnerApi(carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, { method: Methods.DELETE });
        return result;
    }
}
