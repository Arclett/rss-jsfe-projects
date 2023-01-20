import { Utilities } from "./_Utilities";
import { RenderUI } from "./rendering/_RenderUI";
import { Garage } from "./_Garage";

export class Main extends Utilities {
    createInputText: HTMLInputElement;
    createInputColor: HTMLInputElement;
    updateInputText: HTMLInputElement;
    updateInputColor: HTMLInputElement;
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

        [this.createInputText, this.createInputColor] = RenderUI.renderControlElement(controlWrapper, "create");
        [this.updateInputText, this.updateInputColor] = RenderUI.renderControlElement(controlWrapper, "update");

        const garageElems: HTMLElement[] = RenderUI.renderGarage(main);

        this.garage = new Garage(garageElems);
        this.garage.getCars(1, 3);
    }
}
