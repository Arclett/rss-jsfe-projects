import "../styles/main.scss";

let gameScore, resultMessage;
const finalScoreElem = document.querySelector(".final-score");

if (localStorage.getItem("score")) {
  gameScore = localStorage.getItem("score");
}

if (gameScore === 30) {
  resultMessage = "Вы набрали максимальное количество баллов!";
} else {
  resultMessage = `Вы набрали ${gameScore} из 30 возможных баллов!`;
}
finalScoreElem.textContent = resultMessage;
