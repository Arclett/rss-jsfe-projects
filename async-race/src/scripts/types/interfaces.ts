export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface ICarUpdate {
    name: string;
    color: string;
}

export interface IGarageElems {
    garageTitle: HTMLElement;
    pageNumber: HTMLElement;
    raceWrapper: HTMLElement;
}

export interface IControlInput {
    inputColor: HTMLInputElement;
    inputText: HTMLInputElement;
}

export interface ICars {
    cars: ICar[];
    total: string | null;
}

export interface IDrive {
    velocity: number;
    distance: number;
}
export interface IWinnerUpdate {
    wins: number;
    time: number;
}

export interface IWinnerGet {
    wins: number;
    time: number;
    id: number;
}
