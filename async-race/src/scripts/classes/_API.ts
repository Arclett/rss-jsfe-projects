import { Utilities } from "./_Utilities";
import { ICar, ICarUpdate, IWinnerUpdate } from "../types/interfaces";
import { EngineStatus, Order, SortType } from "../types/enums";

export class API extends Utilities {
    async removeCarApi(id: number) {
        await fetch(`${this.makeURL("garage")}/${id}`, { method: "DELETE" });
    }

    async getCarsApi(page: number, limit: number) {
        const result = await fetch(`${this.makeURL("garage")}?_page=${page}&_limit=${limit}`);
        return result;
    }

    async createCarApi(data: { name: string; color: string }) {
        const result = await fetch(`${this.makeURL("garage")}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        return result;
    }

    async getCarApi<T>(id: string): Promise<T> {
        const result = await fetch(`${this.makeURL("garage")}/${id}`).then((res) => res.json());
        return result;
    }

    async updateCarApi(id: number, data: ICarUpdate) {
        const result = await fetch(`${this.makeURL("garage")}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        return result;
    }

    async engineStatusApi(status: EngineStatus, car: ICar): Promise<Response> {
        const result = await fetch(`${this.makeURL("engine")}?id=${car.id}&status=${status}`, {
            method: "PATCH",
        });
        return result;
    }

    async createWinnerApi(car: number, time: number) {
        const data = {
            id: car,
            wins: 1,
            time: time,
        };
        const result = await fetch(`${this.makeURL("winners")}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        return result;
    }

    async getWinnerApi(carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, { method: "GET" });
        return result;
    }

    async updateWinnerApi(data: IWinnerUpdate, carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        return result;
    }

    async getWinnersApi(page: number, sort: SortType, order: Order, limit = 10) {
        const url = `${this.makeURL("winners")}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
        const result = await fetch(url);
        return result;
    }

    async deleteWinnerApi(carId: number) {
        const result = await fetch(`${this.makeURL("winners")}/${carId}`, { method: "DELETE" });
        return result;
    }
}
