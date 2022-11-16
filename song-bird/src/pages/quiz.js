import "../styles/main.scss";
import { BirdCard } from "../scripts/_BirdCard";
import { PlayerCard } from "../scripts/_PlayerCard";
import { PlayerQuiz } from "../scripts/_PlayerQuiz";
import { QuizCl } from "../scripts/_QuizCl";

export const bird = new BirdCard();
const quiz = new QuizCl();
export const quizPlayer = new PlayerQuiz(
  document.querySelector(".guess-wrapper"),
  quiz.getAnswer()
);
export const cardPlayer = new PlayerCard(document.querySelector(".bird-card"));
