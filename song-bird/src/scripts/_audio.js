import { quiz, cardPlayer, audioQuiz } from "../pages/quiz";

export class Player {
  playTime;
  isPlay;
  answer;
  constructor(bird, position) {
    this.bird = bird;
    this.position = position;
    this.playTime = 0;
    this.lengthElement = position.querySelector(".length");
    this.playElement = position.querySelector(".play");
    this.timeline = position.querySelector(".timeline");
    this.volumeBtn = position.querySelector(".volume-button");
    this.volumeSliderElement = position.querySelector(".volume-slider");
    this.songElement = position.querySelector(".audio-status");
    this.audio = new Audio();
    this.volumeSlider = position.querySelector(".volume-slider");
    this.timebarUpdate();

    this.position.addEventListener("click", this.clickHandler.bind(this));
    this.audio.addEventListener("loadeddata", this.loadedData.bind(this));
    this.timeline.addEventListener("click", () => {
      const timelineWidth = window.getComputedStyle(this.timeline).width;
      const timeToSeek =
        (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    });
    this.volumeBtn.addEventListener(
      "mouseover",
      function () {
        this.volumeSliderElement.style.display = "block";
      }.bind(this)
    );
    this.volumeSliderElement.addEventListener(
      "mouseleave",
      function () {
        this.volumeSliderElement.style.display = "none";
      }.bind(this)
    );
    this.songElement.addEventListener(
      "mouseleave",
      function () {
        this.volumeSliderElement.style.display = "none";
      }.bind(this)
    );
    this.volumeSlider.addEventListener(
      "click",
      function (e) {
        const sliderWidth = window.getComputedStyle(this.volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        this.audio.volume = newVolume;
        position.querySelector(".volume-percentage").style.width =
          newVolume * 100 + "%";
      }.bind(this)
    );
    this.volumeBtn.addEventListener(
      "click",
      function () {
        this.audio.muted = !this.audio.muted;
        if (this.audio.muted) {
          this.volumeBtn.style.backgroundImage =
            'url("../assets/svg/mute.svg")';
        } else {
          this.volumeBtn.style.backgroundImage =
            'url("../assets/svg/volume.svg")';
        }
      }.bind(this)
    );
  }

  clickHandler(e) {
    if (e.target.classList.contains("play")) {
      if (this.position.classList.contains("guess-wrapper")) {
        this.bird = quiz.getAnswer();
      } else {
        this.bird = quiz.getCurrentBird();
      }
      this.play(this.bird);
    }
  }

  timelineFunc() {
    const timelineWidth = window.getComputedStyle(this.timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    this.audio.currentTime = timeToSeek;
  }

  loadedData() {
    const audioLength = Math.floor(this.audio.duration);
    this.lengthElement.textContent = `${this.secToMin(audioLength)}`;
    console.log("loaded");
  }

  secToMin(sec) {
    return new Date(sec * 1000).toISOString().slice(15, 19);
  }

  play(bird) {
    if (!this.audio.currentSrc) {
      this.audio.src = bird.audio;
    }
    if (!this.isPlay) {
      cardPlayer.audioPaused();
      audioQuiz.audioPaused();
      this.audioPlay();
    } else {
      this.audioPaused();
    }
  }

  audioPlay() {
    this.audio.currentTime = this.playTime;
    this.audio.play();
    this.isPlay = true;
    this.playElement.style.backgroundImage = `url("../assets/svg/pause.svg")`;
  }

  audioPaused() {
    this.audio.pause();
    this.playTime = this.audio.currentTime;
    this.isPlay = false;
    this.playElement.style.backgroundImage = `url("../assets/svg/play.svg")`;
  }

  timebarUpdate() {
    setInterval(() => {
      const progress = this.position.querySelector(".progress");
      progress.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
      this.position.querySelector(".current").textContent = this.secToMin(
        this.audio.currentTime
      );
    }, 500);
  }
}
