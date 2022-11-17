export class Player {
  playTime;
  isPlay;
  constructor(position) {
    this.position = position;
    this.playTime = 0;
    this.isPlay = false;
    this.playerWrapperElem = position.querySelector(".player");
    this.lengthElement = position.querySelector(".length");
    this.playElement = position.querySelector(".play");
    this.timeline = position.querySelector(".timeline");
    this.volumeBtn = position.querySelector(".volume-icon");
    this.volumeSliderElement = position.querySelector(".volume-slider");
    this.volumeSlider = position.querySelector(".volume-slider");

    this.percentageElem = position.querySelector(".volume-percentage");
    this.quizWrapperElem = document.querySelector(".quiz-wrapper");
    this.audio = new Audio();
    this.timebarUpdate();

    //event handlers
    this.position.addEventListener("mouseover", this.volumeShow.bind(this));
    this.playerWrapperElem.addEventListener(
      "mouseleave",
      this.volumeHide.bind(this)
    );
    this.audio.addEventListener("loadeddata", this.loadedData.bind(this));
    this.playerWrapperElem.addEventListener(
      "click",
      this.clickHandler.bind(this)
    );
  }

  clickHandler(e) {
    if (e.target.classList.contains("timeline")) {
      this.timelineFunc();
    }
    if (
      e.target.classList.contains("volume-percentage") ||
      e.target.classList.contains("volume-slider")
    ) {
      this.volumeSliderFunc(e);
    }
    if (e.target.classList.contains("volume-icon")) {
      this.mute(e);
    }
  }

  mute(e) {
    this.audio.muted = !this.audio.muted;
    if (this.audio.muted) {
      e.target.style.backgroundImage = 'url("../assets/svg/mute.svg")';
    } else {
      e.target.style.backgroundImage = 'url("../assets/svg/volume.svg")';
    }
  }

  volumeShow(e) {
    if (e.target.classList.contains("volume-icon")) {
      this.volumeSlider.style.opacity = "1";
    }
  }

  volumeHide() {
    this.volumeSlider.style.opacity = "0";
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

  secToMin(sec) {
    return new Date(sec * 1000).toISOString().slice(15, 19);
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

  volumeSliderFunc(e) {
    const sliderWidth = window.getComputedStyle(this.volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    this.audio.volume = newVolume;
    this.percentageElem.style.width = newVolume * 100 + "%";
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

  play(e) {
    if (e.target.classList.contains("play") && e.target === this.playElement) {
      if (!this.isPlay) {
        this.audioPlay();
      } else {
        this.audioPaused();
      }
    } else if (
      e.target.classList.contains("play") &&
      e.target !== this.playElement
    ) {
      this.audioPaused();
    }
  }
}
