import { Player } from "./_Player";

export class PlayerCard extends Player {
  constructor(position) {
    super(position);
    this.quizWrapperElem.addEventListener("click", this.play.bind(this));
  }
}
