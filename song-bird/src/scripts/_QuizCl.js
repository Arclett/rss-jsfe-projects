import birdData from "./birdData.json";
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
    this.stageIsComplete = false;
    this.varWrapElem = document.querySelector(".variants-wrapper");
    this.birdCardElem = document.querySelector(".bird-card");
    this.scoreElem = document.querySelector(".score");
    this.nextStgeElem = document.querySelector(".next-stage");
    this.stageElem = document.querySelectorAll(".stage");
    this.birdPlaceholderElem = document.querySelector(".bird-card-placeholder");
    this.quizWrapper = document.querySelector(".quiz-wrapper");

    this.setStage(0);
    this.quizWrapper.addEventListener("click", this.mainHandler.bind(this));
    this.footerElem.addEventListener("click", this.setLang.bind(this));
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setStage = function (num) {
    this.varWrapElem.replaceChildren();
    const birdGroup = birdData[num];
    birdGroup.forEach((e) => {
      const variant = document.createElement("li");
      variant.textContent = e.name;
      variant.className = "variant";
      this.varWrapElem.appendChild(variant);
    });
    this.answer = birdData[this.stage][this.randomInt(0, 5)];
    this.scoreElem.textContent = `Баллы: ${this.score}`;
    this.score += 5;
  };

  chooseVariant(e) {
    if (e.target.classList.contains("variant")) {
      cardPlayer.audioPaused();
      this.currentBird = birdData[this.stage].reduce((acc, elem) => {
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
        bird.setBird(this.stage, this.currentBird.id - 1);
        if (this.currentBird === this.answer) {
          const winAudio = new Audio();
          winAudio.src = "../assets/audio/win.wav";
          this.stageIsComplete = true;
          quizPlayer.audioPaused();
          e.target.classList.add("rightAnswer");
          this.nextStgeElem.classList.add("rightAnswer");
          this.scoreElem.textContent = `Score: ${this.score}`;
          winAudio.play();
        } else {
          const loseAudio = new Audio();
          loseAudio.src = "../assets/audio/lose.wav";
          loseAudio.play();
          this.score--;
          e.target.classList.add("wrongAnswer");
        }
      } else {
        bird.setBird(this.stage, this.currentBird.id - 1);
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

  setLang(e) {
    if (e.target.classList.contains("eng")) {
      let data;
      if (this.lang === "rus") data = rusData[0];
      else data = engData[0];

      document.querySelectorAll(".stage").forEach((e, i) => {
        e.textContent = data.quiz.stages[i];
      });
      document.querySelector(".answer").textContent = data.quiz.guess;
      // document.querySelectorAll(".variant").forEach((e, i) => {
      //   e.textContent = data.var;
      // });
      document.querySelector(".bird-card-placeholder").textContent =
        data.quiz.cardPh;
      this.nextStgeElem.textContent = data.quiz.next;
      this.scoreElem.textContent = data.quiz.score;
    }
  }
}
