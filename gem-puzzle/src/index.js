import "/styles/main.scss";
import { PlayField } from "./scripts/_playField";

// const headerElem = document.querySelector(".header-wrapper");
// const timeElem = document.querySelector(".times");
// const pauseElem = document.querySelector(".pause");
// const pfWrapper = document.querySelector(".play-field-wrapper");

class Main {
  type;
  PlayField;
  playTime;
  gameActive;
  records;
  sortType;
  pfWrapper;
  pauseElem;
  timeElem;
  headerElem;
  constructor() {
    this.renderPage();
    this.pfWrapper = document.querySelector(".play-field-wrapper");
    this.pauseElem = document.querySelector(".pause");
    this.timeElem = document.querySelector(".times");
    this.headerElem = document.querySelector(".header-wrapper");

    this.gameActive = true;
    this.records = [];
    this.sortType = "time";
    this.playTime = new Date(2000, 1, 1, 0, 0, 0);
    this.timeElem.textContent = "Time: 00:00:00";
    this.timer();
    this.type = +document.querySelector(".field-size").value;
    this.matrix = this.checkSolvability();
    this.PlayField = new PlayField(this.matrix, this.type);
    this.headerElem.addEventListener("click", this.controls.bind(this));
    this.pauseElem.addEventListener("click", this.pause.bind(this));
    this.pfWrapper.addEventListener("click", this.chechWin.bind(this));
    this.pfWrapper.addEventListener("click", this.sortRecords.bind(this));
    window.addEventListener("beforeunload", this.setLocal.bind(this));
    window.addEventListener("load", this.getLocal.bind(this));
  }

  renderPage() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="wrapper">
    <header class="header">
      <div class="header-wrapper">
        <h1 class="title">Gem Puzzle</h1>
        <div class="controls">
          <div class="control-elem new-game" title='Choose board size and start new game'>
            <label class="new" title='Choose board size and start new game'
              >New Game:
              <select class="field-size">
                <option value="3" class='str3'>3x3</option>
                <option value="4" class='str4' selected>4x4</option>
                <option value="5" class='str5'>5x5</option>
                <option value="6" class='str6'>6x6</option>
                <option value="7" class='str7'>7x7</option>
                <option value="8" class='str8'>8x8</option>
              </select>
            </label>
          </div>
          <div class="control-elem refresh">Refresh</div>
          <div class="control-elem pause">Records</div>
          <div class="control-elem sound">Sound: Off</div>
        </div>
        <div class="status">
          <div class="status-elem moves"></div>
          <div class="status-elem times"></div>
        </div>
        <div class="score"></div>
      </div>
    </header>
    <main class="play-field">
      <div class="play-field-wrapper"></div>
    </main>
  </div>`
    );
  }

  controls(e) {
    if (e.target === document.querySelector(".new")) {
      this.newGame();
    }
    if (e.target === document.querySelector(".refresh")) {
      this.refresh();
    }
    if (e.target === document.querySelector(".sound")) {
      this.sound(e);
    }
  }

  sound(e) {
    if (this.PlayField.sound) {
      this.PlayField.sound = false;
      e.target.textContent = "Sound: Off";
    } else {
      this.PlayField.sound = true;
      e.target.textContent = "Sound: On";
    }
  }

  refresh() {
    this.matrix = this.checkSolvability();
    this.PlayField.matrix = this.matrix;
    this.PlayField.renderField(this.matrix);
    this.PlayField.moves = 0;
    this.gameActive = true;
    document.querySelector(".moves").textContent = `Moves: 0`;
    this.playTime = new Date(2000, 1, 1, 0, 0, 0);
    this.timeElem.textContent = "Time: 00:00:00";
  }

  newGame() {
    this.type = +document.querySelector(".field-size").value;
    document
      .querySelectorAll("option")
      .forEach((e) => e.removeAttribute("selected"));
    document
      .querySelector(`.str${this.type}`)
      .setAttribute("selected", "selected");
    this.matrix = this.checkSolvability();
    this.PlayField.matrix = this.matrix;
    this.PlayField.typeF = this.type;
    this.PlayField.moves = 0;
    this.gameActive = true;
    document.querySelector(".pause").textContent = "Records";
    this.playTime = new Date(2000, 1, 1, 0, 0, 0);
    this.timeElem.textContent = "Time: 00:00:00";
    document.querySelector(".moves").textContent = `Moves: 0`;
    this.PlayField.renderField(this.matrix);
  }

  pause() {
    if (this.gameActive) {
      this.gameActive = false;
      document.querySelector(".pause").textContent = "Resume";
      this.paused();
    } else {
      this.gameActive = true;
      this.PlayField.renderField(this.PlayField.matrix);
      document.querySelector(".pause").textContent = "Records";
    }
  }

  generateMatrix() {
    let res = [];
    while (res.length < Math.pow(this.type, 2)) {
      let x = this.getRandomInt(0, Math.pow(this.type, 2) - 1);
      if (!res.includes(x)) res.push(x);
    }
    let result = [];
    for (let i = 0; i < this.type; i++) {
      result.push(res.slice(i * this.type, (i + 1) * this.type));
    }
    return result;
  }

  checkSolvability() {
    let y = this.generateMatrix();
    while (!this.isSolvable(y)) {
      y = this.generateMatrix();
    }
    return y;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setTime(time) {
    this.timeElem.textContent = `Time: ${time
      .getHours()
      .toString()
      .padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    return time;
  }

  timer() {
    setInterval(
      function () {
        if (this.gameActive === true) {
          this.playTime = new Date(Date.parse(this.playTime) + 1000);
          this.setTime(this.playTime);
        }
      }.bind(this),
      1000
    );
  }

  paused() {
    this.pfWrapper.replaceChildren();
    this.pfWrapper.classList.add("fieldRecords");
    this.renderRecords();
  }

  renderRecords() {
    if (this.records.length === 0) {
      this.pfWrapper.insertAdjacentHTML(
        "beforeend",
        "<div class='paused'><h2>Game is Paused</h2><h3>Top Results</h3><div class='records'><div class='records-head records-elem'><div class ='pos'>Position</div><div class='mov sort-mov'>Moves</div><div class='time sort-time'>Time</div></div></div>"
      );
      return;
    }
    this.pfWrapper.replaceChildren();
    let ind;
    if (this.sortType === "mov") {
      ind = 0;
    } else {
      ind = 1;
    }
    this.records.sort((a, b) => parseInt(a[ind]) - parseInt(b[ind]));
    for (let i = 0; i <= this.records.length; i++) {
      if (i === 0) {
        this.pfWrapper.insertAdjacentHTML(
          "beforeend",
          "<div class='paused'><h2>Game is Paused</h2><h3>Top Results</h3><div class='records'><div class='records-head records-elem'><div class ='pos'>Position</div><div class='mov sort-mov'>Moves</div><div class='time sort-time'>Time</div></div></div>"
        );
      } else {
        const dates = new Date(+this.records[i - 1][1]);
        const formatDate = `${dates
          .getHours()
          .toString()
          .padStart(2, "0")}:${dates
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${dates.getSeconds().toString().padStart(2, "0")}`;
        document
          .querySelector(".records")
          .insertAdjacentHTML(
            "beforeend",
            `<div class='records-elem'><div class ='pos'>${i}</div><div class='mov'>${
              this.records[i - 1][0]
            }</div><div class='time'>${formatDate}</div></div>`
          );
      }
    }
    document.querySelector(`.sort-${this.sortType}`).classList.add("sorted");
  }

  chechWin() {
    const winCond = [];
    for (let i = 1; i < Math.pow(this.type, 2); i++) {
      winCond.push(i);
    }
    winCond.push(0);
    if (this.PlayField.matrix.flat().join("") === winCond.join("")) {
      const time = Date.parse(this.playTime);
      const timeSting = `${this.playTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${this.playTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${this.playTime
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
      const moves = this.PlayField.moves;
      this.records.push([moves, time]);
      this.records.sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
      this.records = this.records.slice(0, 5);
      this.refresh();
      alert(
        `Hooray! You solved the puzzle in ${timeSting} and ${moves} moves!`
      );
    }
  }

  setLocal() {
    const saveRecords = this.records.join("@");
    localStorage.setItem("records", saveRecords);
    localStorage.setItem("type", this.type);
    const saveMatrix = this.PlayField.matrix.flat();
    localStorage.setItem("matrix", saveMatrix);
    localStorage.setItem("moves", this.PlayField.moves);
    localStorage.setItem("time", Date.parse(this.playTime));
  }

  getLocal() {
    if (localStorage.getItem("records")) {
      const loaded = localStorage.getItem("records");
      this.records = loaded.split("@").map((e) => e.split(","));
    }
    if (localStorage.getItem("type")) {
      this.type = +localStorage.getItem("type");
      this.PlayField.typeF = +localStorage.getItem("type");
      document
        .querySelectorAll("option")
        .forEach((e) => e.removeAttribute("selected"));
      document
        .querySelector(`.str${this.type}`)
        .setAttribute("selected", "selected");
    } else {
      this.type = +document.querySelector(".field-size").value;
    }
    if (localStorage.getItem("matrix")) {
      const retrMatrix = localStorage
        .getItem("matrix")
        .split(",")
        .map((e) => +e);
      let result = [];
      for (let i = 0; i < this.type; i++) {
        result.push(retrMatrix.slice(i * this.type, (i + 1) * this.type));
      }
      this.matrix = result;
      this.PlayField.matrix = result;
      this.PlayField.renderField(result);
    }
    if (localStorage.getItem("moves")) {
      this.PlayField.moves = +localStorage.getItem("moves");
      document.querySelector(
        ".moves"
      ).textContent = `Moves: ${this.PlayField.moves}`;
    }
    if (localStorage.getItem("time")) {
      this.playTime = new Date(+localStorage.getItem("time"));
      this.setTime(this.playTime);
    }
    localStorage.clear();
  }

  sortRecords(e) {
    if (e.target === document.querySelector(".sort-mov")) {
      if (this.sortType === "mov") {
        return;
      } else {
        this.sortType = "mov";
        this.renderRecords();
      }
    }
    if (e.target === document.querySelector(".sort-time")) {
      if (this.sortType === "time") {
        return;
      } else {
        this.sortType = "time";
        this.renderRecords();
      }
    }
  }

  isSolvable(array) {
    let blanRow;
    array.forEach((e, i) => {
      if (e.includes(0)) {
        blanRow = i;
      }
    });
    const arr = array.flat();
    arr.splice(arr.indexOf(0), 1);
    const x = arr.reduce((acc, e, i, arr) => {
      const y = arr.slice(i);
      y.forEach((elem) => {
        if (elem < e) {
          acc = acc + 1;
        }
      });
      return acc;
    }, 0);

    if (array.length % 2 > 0) {
      return x % 2 > 0 ? false : true;
    }
    if (array.length % 2 === 4 || array.length) {
      return (x + blanRow) % 2 > 0 ? true : false;
    }
  }
}

export const main1 = new Main();

// const game1 = new PlayField();
