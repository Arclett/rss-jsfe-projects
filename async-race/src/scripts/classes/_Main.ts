import { RenderUI } from "./rendering/_RenderUI";
import { Garage } from "./_Garage";
import { IGarageElems } from "../types/interfaces";
import { Control } from "./_Control";
import { API } from "./_API";
import { Order, SortType } from "../types/enums";
import { Winners } from "./_Winners";

export class Main extends API {
    control: Control;
    createTextInput: HTMLInputElement;
    garage: Garage;
    controlWrapper: HTMLElement;
    garageElems: IGarageElems;
    winnerWrapper: HTMLElement;
    winner: Winners;

    start() {
        console.log(
            "Здравствуй! Мне немного не хватило времени, основной функционал приложения готов, но буду благодарен если отложишь проверку на денёк, чтобы я мог доделать стили и исправить мелкие недочеты."
        );

        const body: HTMLElement = document.body;
        RenderUI.renderHeader(body);

        const main = document.createElement("main");
        main.className = "main";
        body.appendChild(main);

        this.winnerWrapper = document.createElement("section");
        this.winnerWrapper.className = "winners hidden";
        main.appendChild(this.winnerWrapper);

        this.controlWrapper = document.createElement("section");
        this.controlWrapper.className = "control";
        main.appendChild(this.controlWrapper);

        const createInputs = RenderUI.renderControlElement(this.controlWrapper, "create");
        this.createTextInput = createInputs.inputText;
        const updateInputs = RenderUI.renderControlElement(this.controlWrapper, "update");

        this.control = new Control(createInputs, updateInputs);

        this.garageElems = RenderUI.renderGarage(main);

        this.garage = new Garage(this.garageElems);
        this.garage.initGarage();

        this.winner = new Winners(this.winnerWrapper);

        body.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event) {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("create-button")) this.createCar();
        if (e.target.classList.contains("next-page-button")) this.garage.nextPage();
        if (e.target.classList.contains("prev-page-button")) this.garage.prevPage();
        if (e.target.classList.contains("remove-car-button")) this.garage.removeCar(e.target);
        if (e.target.classList.contains("select-car-button")) this.control.selectCar(e.target);
        if (e.target.classList.contains("update-button")) this.updateCar();
        if (e.target.classList.contains("start-car-button")) this.runEngine(e.target);
        if (e.target.classList.contains("stop-car-button")) this.stopEngine(e.target);
        if (e.target.classList.contains("race-button")) this.garage.race();
        if (e.target.classList.contains("reset-button")) this.garage.initGarage();
        if (e.target.classList.contains("winners-button")) this.toWinner();
        if (e.target.classList.contains("garage-button")) this.toGarage();
        if (e.target.classList.contains("generate-button")) this.generateCars(e);
        if (e.target.classList.contains("next-page-winners")) this.winner.nextPage();
        if (e.target.classList.contains("prev-page-winners")) this.winner.prevPage();
        if (e.target.classList.contains("wins") || e.target.classList.contains("time")) this.winnerSort(e.target);
    }

    async createCar() {
        if (!this.createTextInput.value) return;
        await this.control.createCar();
        await this.garage.initGarage();
    }

    async updateCar() {
        await this.control.updateCarInfo();
        await this.garage.initGarage();
    }

    async runEngine(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        await this.garage.runEngine(id);
    }
    async stopEngine(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        await this.garage.stopEngine(id);
    }

    async toWinner() {
        await this.winner.initWinner();
        this.switchView();
    }

    async toGarage() {
        this.switchView();
    }

    switchView() {
        this.winnerWrapper.classList.toggle("hidden");
        this.garageElems.garageWrapper.classList.toggle("hidden");
        this.controlWrapper.classList.toggle("hidden");
    }

    async generateCars(e: Event) {
        if (!(e.target instanceof HTMLButtonElement)) return;
        e.target.disabled = true;
        await this.control.generateCars();
        await this.garage.initGarage();
        e.target.disabled = false;
    }

    winnerSort(elem: HTMLElement) {
        const arr = Array.from(elem.classList);
        if (arr.includes("sorted") && arr.includes("ASC") && arr.includes("time")) {
            this.winner.initWinner(SortType.time, Order.desc);
        }
        if (arr.includes("sorted") && arr.includes("DESC") && arr.includes("time")) {
            this.winner.initWinner(SortType.time, Order.asc);
        }
        if (arr.includes("sorted") && arr.includes("ASC") && arr.includes("wins")) {
            this.winner.initWinner(SortType.wins, Order.desc);
        }
        if (arr.includes("sorted") && arr.includes("DESC") && arr.includes("wins")) {
            this.winner.initWinner(SortType.wins, Order.asc);
        }
        if (arr.length === 1 && arr.includes("time")) {
            this.winner.initWinner(SortType.time, Order.asc);
        }
        if (arr.length === 1 && arr.includes("wins")) {
            this.winner.initWinner(SortType.wins, Order.desc);
        }
    }
}
