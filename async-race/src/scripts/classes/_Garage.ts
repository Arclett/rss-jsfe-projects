export class Garage {
    garageTitle: HTMLElement;
    pageNumber: HTMLElement;
    raceWrapper: HTMLElement;

    constructor(garageElems: HTMLElement[]) {
        [this.garageTitle, this.pageNumber, this.raceWrapper] = garageElems;
    }

    async getCars(page: number, limit?: number) {
        const data = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=${limit}`);
        const cars = await data.json();
        const count = data.headers.get("X-Total-Count");
        return [cars, count];
    }
}
