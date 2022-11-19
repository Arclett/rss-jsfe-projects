import { Main } from "./_MainCl";
import rusData from "./rusData.json";
import engData from "./engData.json";

export class Result extends Main {
  score;
  langData;
  constructor() {
    super();
    this.finalScoreElem = document.querySelector(".final-score");
    this.loadScore();
    this.setLang();

    // this.resultMessage();

    this.footerElem.addEventListener("click", this.switchLang.bind(this));
  }

  loadScore() {
    if (localStorage.getItem("score")) {
      this.score = localStorage.getItem("score");
    }
  }

  switchLang(e) {
    if (
      e.target.classList.contains("eng") ||
      e.target.classList.contains("rus")
    ) {
      this.setLang();
    }
  }

  setLang() {
    let data;
    if (this.lang === "rus") {
      data = rusData[0];
    } else {
      data = engData[0];
    }
    document.querySelector(".result-title").textContent = data.result.congrats;
    if (this.score === "30") {
      this.finalScoreElem.textContent = data.result.res[2];
    } else {
      this.finalScoreElem.textContent = `${data.result.res[0]}${this.score}${data.result.res[1]}`;
    }
    document.querySelector(".retry-btn").textContent = data.result.tryagain;
    document.querySelector(".gallery-btn").textContent = data.result.togal;
  }
}
