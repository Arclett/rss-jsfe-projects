import "../styles/main.scss";
import { birdCard } from "../scripts/_birdCard";
import birdData from "../scripts/birdData.json";

let currentBird,
  answer,
  score = 0,
  stage = 0,
  stageIsComplete = false;

const varWrapElem = document.querySelector(".variants-wrapper");
const birdCardElem = document.querySelector(".bird-card");
const scoreElem = document.querySelector(".score");
const nextStgeElem = document.querySelector(".next-stage");
const stageElem = document.querySelectorAll(".stage");

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const setStage = function (num) {
  varWrapElem.replaceChildren();
  const birdGroup = birdData[num];
  birdGroup.forEach((e) => {
    const variant = document.createElement("li");
    variant.textContent = e.name;
    variant.className = "variant";
    varWrapElem.appendChild(variant);
  });
  answer = birdData[stage][randomInt(0, 5)];
  score += 5;
  scoreElem.textContent = `Score: ${score}`;
};
setStage(0);

varWrapElem.addEventListener("click", function (e) {
  if (e.target.className === "variant") {
    currentBird = birdData[stage].reduce((acc, elem) => {
      if (e.target.textContent === elem.name) {
        acc = elem;
        return acc;
      } else return acc;
    });
    birdCardElem.classList.remove("hidden");
    if (!stageIsComplete) {
      birdCard(stage, currentBird.id - 1);
      if (currentBird === answer) {
        console.log("winner winer chicken dinner");
        stageIsComplete = true;
        e.target.classList.add("rightAnswer");
        nextStgeElem.classList.add("rightAnswer");
      } else {
        console.log("lol you suck");
        score--;
        scoreElem.textContent = `Score: ${score}`;
        e.target.classList.add("wrongAnswer");
      }
    } else {
      birdCard(stage, currentBird.id - 1);
    }
  }
});

nextStgeElem.addEventListener("click", function () {
  window.location.href = "./result.html";
  if (stageIsComplete && stage < 5) {
    stageElem[stage].classList.remove("active");
    stageElem[stage].classList.add("complete");
    stage++;
    stageElem[stage].classList.add("active");
    birdCardElem.classList.add("hidden");
    stageIsComplete = false;
    setStage(stage);
  }
  if (stageIsComplete && stage === 5) {
    window.location.href = "./result.html";
  }
});
