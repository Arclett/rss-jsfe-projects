import "../styles/main.scss";

class Result {
  score;
  constructor() {
    this.getScore();
    this.finalScoreElem = document.querySelector(".final-score");
    this.resultMessage();
  }

  getScore() {
    if (localStorage.getItem("score")) {
      this.score = localStorage.getItem("score");
    }
  }
  resultMessage() {
    let res;
    if (this.score === 30) {
      res = "Вы набрали максимальное количество баллов!";
    } else {
      res = `Вы набрали ${this.score} из 30 возможных баллов!`;
    }
    this.finalScoreElem.textContent = res;
  }
}

const result = new Result();
