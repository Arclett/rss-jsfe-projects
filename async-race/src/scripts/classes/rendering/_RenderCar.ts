import { RenderCarIcon } from "./_RenderCarIcon";

export class RenderCar {
    static renderCar(container: HTMLElement, name: string, carId: number, carColor: string) {
        const carWrapper = document.createElement("div");
        carWrapper.className = "car-wrapper";
        carWrapper.dataset.carId = carId + "";
        container.appendChild(carWrapper);

        const carName = document.createElement("h3");
        carName.textContent = name;

        const carSelect = document.createElement("button");
        carSelect.textContent = "select";
        carSelect.className = "select-car-button";

        const carRemove = document.createElement("button");
        carRemove.textContent = "remove";
        carRemove.className = "remove-car-button";

        const start = document.createElement("button");
        start.textContent = "start";
        start.className = "start-car-button";

        const stop = document.createElement("button");
        stop.textContent = "stop";
        stop.className = "stop-car-button";

        const carLogoWrapper = document.createElement("div");
        carLogoWrapper.className = `car-icon car-icon-${carId}`;
        carLogoWrapper.insertAdjacentHTML("beforeend", RenderCarIcon.getCarIcon(carColor));

        const finish = new Image();
        finish.src = "../../assets/svg/finish-icon.svg";
        finish.className = "finish-icon";

        const road = document.createElement("div");
        road.className = "road";

        carWrapper.append(carName, carSelect, carRemove, start, stop, carLogoWrapper, finish, road);
        return carLogoWrapper;
    }
}
