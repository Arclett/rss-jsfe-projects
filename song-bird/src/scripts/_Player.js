export class Player {
  constructor(position) {
    this.timelineGrabbed = false;
    this.position = position;
    this.playTime = 0;
    this.isPlay = false;
    this.playerWrapperElem = position.querySelector(".player");
    this.renderPlayer();
    this.quizWrapperElem = document.querySelector(".quiz-wrapper");
    this.audio = new Audio();
    this.timebarInterval();

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
    this.playerWrapperElem.addEventListener(
      "input",
      this.inputHandler.bind(this)
    );
    this.timeline.addEventListener("mousedown", this.timelineGrab.bind(this));
    this.timeline.addEventListener("mouseup", this.timelineDrop.bind(this));
  }

  renderPlayer() {
    //play button
    this.playElement = document.createElement("button");
    this.playElement.className = "play";
    this.playerWrapperElem.appendChild(this.playElement);
    //timeline
    this.timeline = document.createElement("input");
    this.timeline.className = "timeline scroll-bar";
    this.timeline.setAttribute("type", "range");
    this.timeline.setAttribute("min", 0);
    this.timeline.setAttribute("step", 1);
    this.timeline.setAttribute("value", 0);
    this.playerWrapperElem.appendChild(this.timeline);
    //time
    const audioTime = document.createElement("div");
    audioTime.className = "audio-time";
    this.playerWrapperElem.appendChild(audioTime);
    this.currentElem = document.createElement("div");
    this.currentElem.className = "current";
    this.currentElem.textContent = "0:00";
    audioTime.appendChild(this.currentElem);
    const divider = document.createElement("div");
    audioTime.appendChild(divider);
    divider.textContent = "/";
    this.lengthElem = document.createElement("div");
    this.lengthElem.className = "length";
    this.lengthElem.textContent = "0:00";
    audioTime.appendChild(this.lengthElem);
    //volume-bar
    this.volumeSlider = document.createElement("input");
    this.volumeSlider.className = "volume-slider scroll-bar";
    this.volumeSlider.setAttribute("type", "range");
    this.volumeSlider.setAttribute("min", 0);
    this.volumeSlider.setAttribute("max", 100);
    this.volumeSlider.setAttribute("step", 1);
    this.volumeSlider.setAttribute("value", 100);
    this.playerWrapperElem.appendChild(this.volumeSlider);
    //volume-button
    const volumeBtn = document.createElement("div");
    volumeBtn.className = "volume-icon";
    this.playerWrapperElem.appendChild(volumeBtn);
  }

  secToMin(sec) {
    return new Date(sec * 1000).toISOString().slice(15, 19);
  }

  loadedData() {
    const audioLength = Math.floor(this.audio.duration);
    this.lengthElem.textContent = `${this.secToMin(audioLength)}`;
    this.timeline.setAttribute("max", `${Math.floor(this.audio.duration)}`);
    this.timeline.value = 0;
  }

  clickHandler(e) {
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

  inputHandler(e) {
    if (e.target.classList.contains("timeline")) {
      this.timelineInput();
    }
    if (e.target.classList.contains("volume-slider")) {
      this.volumeSliderFunc();
    }
  }

  //volume

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

  volumeSliderFunc() {
    this.audio.volume = this.volumeSlider.value / 100;
    this.volumeSlider.style.backgroundSize = `${this.volumeSlider.value}% 100%`;
  }

  //timebar functions

  timebarInterval() {
    setInterval(() => {
      if (!this.timelineGrabbed) {
        this.timebarUpdate();
      }
    }, 200);
  }

  timebarUpdate() {
    this.timeline.value = Math.floor(this.audio.currentTime);
    this.renderTimeline();
  }

  timelineInput() {
    this.renderTimeline();
  }

  timelineGrab() {
    this.timelineGrabbed = true;
  }

  timelineDrop() {
    this.timelineGrabbed = false;
    this.audio.currentTime = this.timeline.value;
    this.playTime = this.timeline.value;
    this.renderTimeline();
  }

  renderTimeline() {
    const size = (this.timeline.value / this.timeline.max) * 100;
    this.timeline.style.backgroundSize = `${size}% 100%`;
    this.currentElem.textContent = this.secToMin(this.audio.currentTime);
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
