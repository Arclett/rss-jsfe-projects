import { Utilities } from "./_Utilities";
import { RenderUI } from "./rendering/_RenderUI";

export class Main extends Utilities {
    createInputText: HTMLInputElement;
    createInputColor: HTMLInputElement;
    updateInputText: HTMLInputElement;
    updateInputColor: HTMLInputElement;
    garageTitle: HTMLElement;
    page: HTMLElement;
    raceWrapper: HTMLElement;

    start() {
        const body: HTMLElement = document.body;
        RenderUI.renderHeader(body);
        const [inputs, elements] = RenderUI.renderMain(body);
        [this.createInputText, this.createInputColor, this.updateInputText, this.updateInputColor] = inputs;
        [this.garageTitle, this.page, this.raceWrapper] = elements;
    }
}
