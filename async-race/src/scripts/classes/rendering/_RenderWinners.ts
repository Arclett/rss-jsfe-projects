import { WinnerData } from "../../types/interfaces";
import { RenderCarIcon } from "./_RenderCarIcon";

export class RenderWinners {
    static renderWinnersUI(container: HTMLElement) {
        const title = document.createElement("h2");
        title.className = "winners-title";

        const winnersPage = document.createElement("div");
        winnersPage.className = "winners-page";

        const winnersTable = document.createElement("div");
        winnersTable.className = "winners-table";

        const pageButtonWrapper = document.createElement("div");
        pageButtonWrapper.className = "page-winners-wrapper";

        const pageBack = document.createElement("button");
        pageBack.textContent = "Prev";
        pageBack.className = "prev-page-winners";

        const pageNext = document.createElement("button");
        pageNext.textContent = "Next";
        pageNext.className = "next-page-winners";

        pageButtonWrapper.append(pageBack, pageNext);

        container.append(title, winnersPage, winnersTable, pageButtonWrapper);

        return { title: title, winnersPage: winnersPage, winnersTable: winnersTable };
    }

    static renderWinnersHead(container: HTMLElement) {
        const number = document.createElement("div");
        number.textContent = "number";
        const carLogo = document.createElement("div");
        carLogo.textContent = "car";
        const carName = document.createElement("div");
        carName.textContent = "carName";
        const wins = document.createElement("div");
        wins.textContent = "wins";
        wins.className = "wins";
        const time = document.createElement("div");
        time.textContent = "best time";
        time.className = "time";

        container.append(number, carLogo, carName, wins, time);
        return [wins, time];
    }

    static renderWinner(container: HTMLElement, carData: WinnerData, index: number) {
        const number = document.createElement("div");
        number.textContent = `${index + 1}`;

        const carLogo = document.createElement("div");
        carLogo.className = "winner-logo";

        carLogo.insertAdjacentHTML("beforeend", RenderCarIcon.getCarIcon(carData.color));

        const carName = document.createElement("div");
        carName.textContent = carData.name;
        const wins = document.createElement("div");
        wins.textContent = `${carData.wins}`;
        const time = document.createElement("div");
        time.textContent = `${carData.time}`;

        container.append(number, carLogo, carName, wins, time);
    }
}
