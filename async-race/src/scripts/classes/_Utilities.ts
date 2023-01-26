export class Utilities {
    protected raceWidth = 86;

    protected garageLimit = 7;

    protected winnersLimit = 10;

    protected generatedCarNumber = 100;

    protected urlBase = "http://localhost:3000";

    protected makeURL(path: string) {
        return `${this.urlBase}/${path}`;
    }

    protected getIdFromParent(elem: HTMLElement | HTMLInputElement): string | undefined {
        const parent: HTMLElement | null = elem.closest(".car-wrapper");
        return parent?.dataset.carId;
    }

    protected timeToSec(ms: number) {
        return (ms / 1000).toFixed(2);
    }

    protected randomName() {
        const first = ["Lada", "GAZ", "Audi", "Kia", "Hyundai", "Renualt", "BMV", "Toyota", "Mazda", "UAZ"];
        const second = ["Vesta", "RAV-4", "K5", "Volga", "Duster", "X5", "A7", "CX-5", "4x4", "Solaris"];
        return `${first[this.randomNum(0, 9)]} ${second[this.randomNum(0, 9)]}`;
    }

    protected randomColor() {
        const genPart = () => this.randomNum(0, 255).toString(16);
        return `#${genPart()}${genPart()}${genPart()}`;
    }

    protected randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
