import { Order, SortType } from "../types/enums";
import { ICar, IWinnerGet, WinnerData, WinnersElem } from "../types/interfaces";
import { RenderWinners } from "./rendering/_RenderWinners";
import { API } from "./_API";

export class Winners extends API {
    private currentPage = 1;

    private carTotal: number;

    private limit = 10;

    private winnersElem: WinnersElem;

    private container: HTMLElement;

    constructor(container: HTMLElement) {
        super();
        this.container = container;
    }

    async initWinner(sort: SortType = SortType.time, order: Order = Order.asc) {
        this.container.replaceChildren();
        const res = await this.getWinnersApi(this.currentPage, sort, order, this.limit);
        const count = res.headers.get("X-Total-Count");
        if (!count) return;
        this.carTotal = +count;
        const data: IWinnerGet[] = await res.json();
        this.winnersElem = RenderWinners.renderWinnersUI(this.container);
        this.winnersElem.title.textContent = `Winners (${this.carTotal})`;
        this.winnersElem.winnersPage.textContent = `Page ${this.currentPage}`;

        const headElem = RenderWinners.renderWinnersHead(this.winnersElem.winnersTable);
        if (sort === "time") {
            headElem[1].classList.add("sorted");
            headElem[1].classList.add(order);
        } else {
            headElem[0].classList.add("sorted");
            headElem[0].classList.add(order);
        }

        data.forEach(async (e, i) => {
            const car: ICar = await this.getCarApi(`${e.id}`);
            const winner: WinnerData = {
                color: car.color,
                wins: e.wins,
                time: e.time,
                name: car.name,
            };
            RenderWinners.renderWinner(this.winnersElem.winnersTable, winner, i);
        });
    }

    nextPage(limit = this.winnersLimit) {
        if (this.carTotal - this.currentPage * limit <= 0) return;
        this.currentPage++;
        this.initWinner();
    }

    prevPage() {
        if (this.currentPage === 1) return;
        this.currentPage--;
        this.initWinner();
    }

    winnerSort(elem: HTMLElement) {
        const arr = Array.from(elem.classList);
        if (arr.includes("sorted") && arr.includes("ASC") && arr.includes("time")) {
            this.initWinner(SortType.time, Order.desc);
        }
        if (arr.includes("sorted") && arr.includes("DESC") && arr.includes("time")) {
            this.initWinner(SortType.time, Order.asc);
        }
        if (arr.includes("sorted") && arr.includes("ASC") && arr.includes("wins")) {
            this.initWinner(SortType.wins, Order.desc);
        }
        if (arr.includes("sorted") && arr.includes("DESC") && arr.includes("wins")) {
            this.initWinner(SortType.wins, Order.asc);
        }
        if (arr.length === 1 && arr.includes("time")) {
            this.initWinner(SortType.time, Order.asc);
        }
        if (arr.length === 1 && arr.includes("wins")) {
            this.initWinner(SortType.wins, Order.desc);
        }
    }
}
