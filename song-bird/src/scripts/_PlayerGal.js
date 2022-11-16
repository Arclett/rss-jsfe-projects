import { Player } from "./_Player";

export class PlayerGal extends Player {
  constructor(position) {
    super(position);
    this.playElement.addEventListener("click", this.play.bind(this));
  }

  play() {
    if (!this.isPlay) {
      this.audioPlay();
    } else {
      this.audioPaused();
    }
  }
}
