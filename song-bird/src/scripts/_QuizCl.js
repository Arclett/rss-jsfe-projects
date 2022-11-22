import birdData from "./birdData.json";
import birdsDataEn from "./_birdEngData";
import engData from "./engData.json";
import rusData from "./rusData.json";

import { cardPlayer, quizPlayer, bird } from "../pages/quiz";
import { Main } from "./_MainCl";

export class QuizCl extends Main {
  currentBird;
  answer;
  score;
  stage;
  stageIsComplete;
  audio;
  constructor() {
    super();
    this.score = 0;
    this.stage = 0;
    this.birdDataLang = this.lang === "rus" ? birdData : birdsDataEn;
    this.currentBird = this.birdDataLang[0][0];
    this.varWrapElem = document.querySelector(".variants-wrapper");
    this.birdCardElem = document.querySelector(".bird-card");
    this.scoreElem = document.querySelector(".score");
    this.scoreLabelElem = document.querySelector(".score-label");
    this.nextStgeElem = document.querySelector(".next-stage");
    this.stageElem = document.querySelectorAll(".stage");
    this.birdPlaceholderElem = document.querySelector(".bird-card-placeholder");
    this.quizWrapper = document.querySelector(".quiz-wrapper");
    this.guessAnswer = document.querySelector(".answer-guess");
    this.guessRight = document.querySelector(".answer-right");
    this.guessWrong = document.querySelector(".answer-wrong");
    this.curImgElem = document.querySelector(".bird-cur-img");
    this.setStage(0);
    this.setLang();

    this.quizWrapper.addEventListener("click", this.mainHandler.bind(this));
    this.footerElem.addEventListener("click", this.changeLang.bind(this));
  }

  setStage = function (num) {
    this.varWrapElem.replaceChildren();
    const birdGroup = this.birdDataLang[num];
    console.log(birdGroup);
    birdGroup.forEach((e) => {
      const variant = document.createElement("li");
      variant.textContent = e.name;
      variant.className = "variant";
      this.varWrapElem.appendChild(variant);
    });
    this.answer = this.birdDataLang[this.stage][this.randomInt(0, 5)];
    this.scoreElem.textContent = this.score;
    this.score += 5;
  };

  chooseVariant(e) {
    if (e.target.classList.contains("variant")) {
      cardPlayer.audioPaused();
      this.currentBird = this.birdDataLang[this.stage].reduce((acc, elem) => {
        if (e.target.textContent === elem.name) {
          acc = elem;
          return acc;
        } else return acc;
      });
      cardPlayer.audio.src = this.currentBird.audio;
      cardPlayer.audio.playTime = 0;
      this.birdCardElem.classList.remove("hidden");
      this.birdPlaceholderElem.classList.add("hidden");
      if (!this.stageIsComplete) {
        bird.setBird(this.stage, this.currentBird.id - 1, this.birdDataLang);
        if (this.currentBird === this.answer) {
          const winAudio = new Audio();
          winAudio.src = "../assets/audio/win.wav";
          this.stageIsComplete = true;
          quizPlayer.audioPaused();
          e.target.classList.add("rightAnswer");
          this.nextStgeElem.classList.add("rightAnswer");
          this.scoreElem.textContent = this.score;
          winAudio.play();
          this.guessAnswer.style.display = "none";
          this.guessRight.style.display = "flex";
          this.guessWrong.style.display = "none";
          this.curImgElem.src = `${this.answer.image}`;
        } else {
          const loseAudio = new Audio();
          loseAudio.src = "../assets/audio/lose.wav";
          loseAudio.play();
          if (!e.target.classList.contains("wrongAnswer")) {
            this.score--;
          }
          e.target.classList.add("wrongAnswer");
          this.guessAnswer.style.display = "none";
          this.guessWrong.style.display = "flex";
          this.guessRight.style.display = "none";
        }
      } else {
        bird.setBird(this.stage, this.currentBird.id - 1, this.birdDataLang);
      }
    }
  }

  mainHandler(e) {
    if (e.target.classList.contains("variant")) {
      this.chooseVariant(e);
    }
    if (e.target.classList.contains("next-stage")) {
      this.nextStage();
    }
  }

  nextStage() {
    if (this.stageIsComplete && this.stage < 5) {
      quizPlayer.audioPaused();
      cardPlayer.audioPaused();
      this.stageElem[this.stage].classList.remove("active");
      this.stageElem[this.stage].classList.add("complete");
      this.stage++;
      this.stageElem[this.stage].classList.add("active");
      this.birdCardElem.classList.add("hidden");
      this.birdPlaceholderElem.classList.remove("hidden");
      this.nextStgeElem.classList.remove("rightAnswer");
      this.stageIsComplete = false;
      this.playTime = 0;
      this.setStage(this.stage);
      quizPlayer.bird = this.answer;
      quizPlayer.audio.src = this.answer.audio;
      quizPlayer.playTime = 0;
      this.guessAnswer.style.display = "flex";
      this.guessRight.style.display = "none";
      this.guessWrong.style.display = "none";
      this.setLang();
      this.curImgElem.src = "../assets/img/bird_outline.jpg";
    }
    if (this.stageIsComplete && this.stage === 5) {
      quizPlayer.audioPaused();
      cardPlayer.audioPaused();
      localStorage.setItem("score", this.score);
      window.location.href = "./result.html";
    }
  }
  getAnswer() {
    return this.answer;
  }

  changeLang(e) {
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
      this.birdDataLang = birdData;
    } else {
      data = engData[0];
      this.birdDataLang = birdsDataEn;
    }
    const id = this.answer.id;
    this.answer = this.birdDataLang[this.stage][id - 1];
    const curId = this.currentBird.id;
    this.currentBird = this.birdDataLang[this.stage][curId - 1];
    bird.setBird(this.stage, this.currentBird.id - 1, this.birdDataLang);
    document.querySelectorAll(".stage").forEach((e, i) => {
      e.textContent = data.quiz.stages[i];
    });
    this.guessAnswer.textContent = data.quiz.guess[0];
    this.guessRight.textContent = `${data.quiz.guess[1]}${this.answer.name}`;
    this.guessWrong.textContent = data.quiz.guess[2];
    document.querySelectorAll(".variant").forEach((elem, i) => {
      console.log(this.stage);
      elem.textContent = this.birdDataLang[this.stage][i].name;
    });
    document.querySelector(".bird-card-placeholder").textContent =
      data.quiz.cardPh;
    this.nextStgeElem.textContent = data.quiz.next;
    document.querySelector(".score-label").textContent =
      this.lang === "rus" ? "Очки: " : "Score: ";
  }
}
