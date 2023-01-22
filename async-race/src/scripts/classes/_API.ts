import { Utilities } from "./_Utilities";
import { ICar, ICarUpdate, IWinnerUpdate } from "../types/interfaces";
import { EngineStatus, Order, SortType } from "../types/enums";

export class API extends Utilities {
    constructor() {
        super();
    }

    async removeCarApi(id: number) {
        await fetch(`${this.makeURL("garage")}/${id}`, { method: "DELETE" });
    }

    async getCarsApi(page: number, limit: number) {
        return await fetch(`${this.makeURL("garage")}?_page=${page}&_limit=${limit}`);
    }

    async createCarApi(data: { name: string; color: string }) {
        return await fetch(`${this.makeURL("garage")}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    }

    async getCarApi<T>(id: string): Promise<T> {
        return await fetch(`${this.makeURL("garage")}/${id}`).then((res) => res.json());
    }

    async updateCarApi(id: number, data: ICarUpdate) {
        return await fetch(`${this.makeURL("garage")}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    }

    async engineStatusApi(status: EngineStatus, car: ICar): Promise<Response> {
        return await fetch(`${this.makeURL("engine")}?id=${car.id}&status=${status}`, {
            method: "PATCH",
        });
    }

    async createWinnerApi(car: number, time: number) {
        const data = {
            id: car,
            wins: 1,
            time: time,
        };
        return await fetch(`${this.makeURL("winners")}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }

    async getWinnerApi(carId: number) {
        return await fetch(`${this.makeURL("winners")}/${carId}`, { method: "GET" });
    }

    async updateWinnerApi(data: IWinnerUpdate, carId: number) {
        return await fetch(`${this.makeURL("winners")}/${carId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }

    async getWinnersApi(page: number, limit: number = 10, sort: SortType, order: Order) {
        const url = `${this.makeURL("winners")}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
        return await fetch(url);
    }

    async deleteWinnerApi(carId: number) {
        return await fetch(`${this.makeURL("winners")}/${carId}`, { method: "DELETE" });
    }
}
