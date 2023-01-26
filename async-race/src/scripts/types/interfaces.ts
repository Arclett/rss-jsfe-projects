export interface ICarWithId {
    name: string;
    color: string;
    id: number;
}

export interface ICar {
    name: string;
    color: string;
}

export interface IGarageElems {
    garageWrapper: HTMLElement;
    garageTitle: HTMLElement;
    pageNumber: HTMLElement;
    raceWrapper: HTMLElement;
    race: HTMLButtonElement;
    pageNext: HTMLButtonElement;
    pageBack: HTMLButtonElement;
}

export interface IControlInput {
    inputColor: HTMLInputElement;
    inputText: HTMLInputElement;
}

export interface ICars {
    cars: ICarWithId[];
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

export interface ICarElements {
    carLogo: HTMLElement;
    startButton: HTMLButtonElement;
    stopButton: HTMLButtonElement;
}

export interface WinnerData {
    color: string;
    name: string;
    wins: number;
    time: number;
}

export interface WinnersElem {
    title: HTMLElement;
    winnersPage: HTMLElement;
    winnersTable: HTMLElement;
}
