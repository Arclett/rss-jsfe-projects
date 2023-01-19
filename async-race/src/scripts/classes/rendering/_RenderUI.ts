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

    static renderMain(container: HTMLElement): [HTMLInputElement[], HTMLElement[]] {
        const main = document.createElement("main");
        main.className = "main";
        container.appendChild(main);

        const controlWrapper = document.createElement("section");
        controlWrapper.className = "control";

        const [createInputText, createInputColor] = RenderUI.renderControlElement(controlWrapper, "create");
        const [updateInputText, updateInputColor] = RenderUI.renderControlElement(controlWrapper, "update");
        main.appendChild(controlWrapper);

        const [garageTitle, page, raceWrapper] = RenderUI.renderGarage(main);

        const inputs: HTMLInputElement[] = [createInputText, createInputColor, updateInputText, updateInputColor];
        const elements: HTMLElement[] = [garageTitle, page, raceWrapper];
        return [inputs, elements];
    }

    static renderControlElement(container: HTMLElement, type: string) {
        const controlElement = document.createElement("div");
        controlElement.className = `control-elem-${type}`;

        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.className = `control-input ${type}-text-input`;

        const inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.className = `control-input ${type}-color-input`;

        const button = document.createElement("button");
        button.textContent = type;
        button.className = `control-button ${type}-button`;

        controlElement.append(inputText, inputColor, button);
        container.appendChild(controlElement);
        return [inputText, inputColor];
    }

    static renderGarage(container: HTMLElement) {
        const garageWrapper = document.createElement("section");
        garageWrapper.className = "garage-wrapper";

        const garageTitle = document.createElement("h2");
        garageTitle.className = "garage-title";
        garageTitle.textContent = "Garage";

        const page = document.createElement("div");
        page.className = "garage-page";
        page.textContent = "page";

        const raceWrapper = document.createElement("div");
        raceWrapper.className = "race-wrapper";

        const pageButtonWrapper = document.createElement("div");
        pageButtonWrapper.className = "page-button-wrapper";

        const pageBack = document.createElement("button");
        pageBack.textContent = "Back";
        pageBack.className = "back-page-button";

        const pageNext = document.createElement("button");
        pageNext.textContent = "Next";
        pageNext.className = "next-page-button";

        pageButtonWrapper.append(pageBack, pageNext);
        garageWrapper.append(garageTitle, page, raceWrapper, pageButtonWrapper);
        container.appendChild(garageWrapper);

        return [garageTitle, page, raceWrapper];
    }
}
