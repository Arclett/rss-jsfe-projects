import { IControlInput, IGarageElems } from "../../types/interfaces";

export class RenderUI {
    static renderHeader(container: HTMLElement): void {
        const header = `
        <header class='header'>
          <h1 class='main-title'>Async Race</h1>
          <button class='garage-button'>To Garage</button>
          <button class='winners-button'>To Winners</button>
        </header>`;

        container.insertAdjacentHTML("afterbegin", header);
    }

    static renderControlElement(container: HTMLElement, type: string): IControlInput {
        const controlElement = document.createElement("div");
        controlElement.className = `control-elem-${type}`;

        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.className = `control-input ${type}-text-input`;

        const inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.className = `control-input ${type}-color-input`;

        if (type === "update") {
            inputColor.disabled = true;
            inputText.disabled = true;
        }

        const button = document.createElement("button");
        button.textContent = type;
        button.className = `control-button ${type}-button`;

        controlElement.append(inputText, inputColor, button);
        container.appendChild(controlElement);
        return {
            inputColor: inputColor,
            inputText: inputText,
        };
    }

    static renderGarage(container: HTMLElement): IGarageElems {
        const garageWrapper = document.createElement("section");
        garageWrapper.className = "garage-wrapper";

        const garageTitle = document.createElement("h2");
        garageTitle.className = "garage-title";

        const page = document.createElement("div");
        page.className = "garage-page";

        const raceWrapper = document.createElement("div");
        raceWrapper.className = "race-wrapper";

        const pageButtonWrapper = document.createElement("div");
        pageButtonWrapper.className = "page-button-wrapper";

        const pageBack = document.createElement("button");
        pageBack.textContent = "Prev";
        pageBack.className = "prev-page-button";

        const pageNext = document.createElement("button");
        pageNext.textContent = "Next";
        pageNext.className = "next-page-button";

        pageButtonWrapper.append(pageBack, pageNext);
        garageWrapper.append(garageTitle, page, raceWrapper, pageButtonWrapper);
        container.appendChild(garageWrapper);

        return { garageTitle: garageTitle, pageNumber: page, raceWrapper: raceWrapper };
    }
}
