export class Utilities {
    raceWidth: number = 92;
    garageLimit: number = 7;
    makeURL(path: string) {
        return `http://localhost:3000/${path}`;
    }

    getIdFromParent(elem: HTMLElement | HTMLInputElement): string | undefined {
        const parent: HTMLElement | null = elem.closest(".car-wrapper");
        return parent?.dataset.carId;
    }

    timeToSec(ms: number) {
        return (ms / 1000).toFixed(2);
    }
}
