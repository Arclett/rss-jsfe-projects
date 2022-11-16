import { Player } from "./_Player";

export class PlayerQuiz extends Player {
  constructor(position, bird) {
    super(position);
    this.bird = bird;
    this.audio.src = this.bird.audio;
    this.quizWrapperElem.addEventListener("click", this.play.bind(this));
  }
}
