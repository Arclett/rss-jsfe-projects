import { IControlInput } from "../types/interfaces";
import { ICar } from "../types/interfaces";
import { API } from "./_API";

export class Control extends API {
    createInputs: IControlInput;
    updateInputs: IControlInput;

    currentCar: ICar;

    constructor(createInputs: IControlInput, updateInputs: IControlInput) {
        super();
        this.createInputs = createInputs;
        this.updateInputs = updateInputs;
    }

    async createCar<T>(): Promise<T> {
        console.log(this.createInputs.inputColor.value);
        const data = {
            name: this.createInputs.inputText.value,
            color: this.createInputs.inputColor.value,
        };
        return await this.createCarApi(data);
    }

    async selectCar(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        this.currentCar = await this.getCarApi(id);
        this.updateInputs.inputColor.disabled = false;
        this.updateInputs.inputColor.value = this.currentCar.color;
        this.updateInputs.inputText.disabled = false;
        this.updateInputs.inputText.value = this.currentCar.name;
    }

    async updateCarInfo() {
        if (!this.currentCar || !this.updateInputs.inputText.value) return;
        const data = {
            name: this.updateInputs.inputText.value,
            color: this.updateInputs.inputColor.value,
        };

        await this.updateCarApi(this.currentCar.id, data);
    }

    async generateCars() {
        for (let i = 0; i < 100; i++) {
            const data = {
                name: this.randomName(),
                color: this.randomColor(),
            };
            await this.createCarApi(data);
        }
    }
}
