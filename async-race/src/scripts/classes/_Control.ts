import { ICarUpdate, IControlInput } from "../types/interfaces";
import { Utilities } from "./_Utilities";
import { ICar } from "../types/interfaces";

export class Control extends Utilities {
    createInputs: IControlInput;
    updateInputs: IControlInput;

    currentCar: ICar;

    constructor(createInputs: IControlInput, updateInputs: IControlInput) {
        super();
        this.createInputs = createInputs;
        this.updateInputs = updateInputs;
    }

    async createCar<T>(): Promise<T> {
        const data = {
            name: this.createInputs.inputText.value,
            color: this.createInputs.inputColor.value,
        };
        return await fetch(`${this.makeURL("garage")}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    }

    async selectCar(elem: HTMLElement) {
        const id = this.getIdFromParent(elem);
        if (!id) return;
        this.currentCar = await this.getCar(id);
        this.updateInputs.inputColor.disabled = false;
        this.updateInputs.inputColor.value = this.currentCar.color;
        this.updateInputs.inputText.disabled = false;
        this.updateInputs.inputText.value = this.currentCar.name;
    }

    async getCar<T>(id: string): Promise<T> {
        return await fetch(`${this.makeURL("garage")}/${id}`).then((res) => res.json());
    }

    async updateCarInfo() {
        if (!this.currentCar || !this.updateInputs.inputText.value) return;
        console.log("kek");
        const data = {
            name: this.updateInputs.inputText.value,
            color: this.updateInputs.inputColor.value,
        };

        const res = await this.updateCar(this.currentCar.id, data);
    }

    async updateCar(id: number, data: ICarUpdate) {
        return await fetch(`${this.makeURL("garage")}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    }
}
