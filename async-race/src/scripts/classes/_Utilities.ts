export class Utilities {
    makeURL(path: string) {
        return `http://localhost:3000/${path}`;
    }

    getIdFromParent(elem: HTMLElement | HTMLInputElement): string | undefined {
        const parent: HTMLElement | null = elem.closest(".car-wrapper");
        return parent?.dataset.carId;
    }
}
