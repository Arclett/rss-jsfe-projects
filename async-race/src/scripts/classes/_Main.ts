import { Utilities } from "./_Utilities";
import { RenderUI } from "./rendering/_RenderUI";
import { Garage } from "./_Garage";
import { IGarageElems } from "../types/interfaces";
import { Control } from "./_Control";

export class Main extends Utilities {
    control: Control;
    createTextInput: HTMLInputElement;
    garage: Garage;

    start() {
        const body: HTMLElement = document.body;
        RenderUI.renderHeader(body);

        const main = document.createElement("main");
        main.className = "main";
        body.appendChild(main);

        const controlWrapper = document.createElement("section");
        controlWrapper.className = "control";
        main.appendChild(controlWrapper);

        const createInputs = RenderUI.renderControlElement(controlWrapper, "create");
        this.createTextInput = createInputs.inputText;
        const updateInputs = RenderUI.renderControlElement(controlWrapper, "update");

        this.control = new Control(createInputs, updateInputs);

        const garageElems: IGarageElems = RenderUI.renderGarage(main);

        this.garage = new Garage(garageElems);
        this.garage.initGarage();

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
    }

    async createCar() {
        if (!this.createTextInput.value) return;
        const res = await this.control.createCar();
        this.garage.initGarage();
    }

    async updateCar() {
        await this.control.updateCarInfo();
        await this.garage.initGarage();
    }

    async runEngine(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        this.garage.runEngine(id);
    }
}
