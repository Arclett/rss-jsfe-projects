const pfWrapper = document.querySelector(".play-field-wrapper");
const movesElement = document.querySelector(".moves");

export class PlayField {
  #animationGo;
  #moveTarget;
  #movable;
  typeF;
  moves;
  time;
  sound = false;
  constructor(matrix, type) {
    //initial
    this.moves = 0;
    movesElement.textContent = `Moves: ${this.moves}`;
    this.typeF = type;
    this.matrix = matrix;
    this.renderField(this.matrix);
    this.#animationGo = false;

    //even handlers

    pfWrapper.addEventListener("click", this.moveTile.bind(this));
    pfWrapper.addEventListener("drag", function (e) {
      e.preventDefault();
    });
    pfWrapper.addEventListener("dragstart", this.dragTile.bind(this));
    pfWrapper.addEventListener("drop", this.dropTile.bind(this));
    pfWrapper.addEventListener("dragend", this.dropTile.bind(this));
  }

  //Move tile

  moveTile(e) {
    if (
      e.target.classList.contains("gem") &&
      this.#animationGo === false &&
      e.target !== document.querySelector("#e0")
    ) {
      this.#animationGo = true;
      let value = +e.target.textContent;
      if (this.#movable.some((elem) => elem.tile === e.target)) {
        let dir;
        this.#movable.forEach((elem) => {
          if (e.target === elem.tile) {
            dir = elem.direction;
          }
        });
        e.target.classList.add(`move${dir}`);
      } else {
        this.#animationGo = false;
        return;
      }
      this.updateMatrix(value);
      this.moves++;
      movesElement.textContent = `Moves: ${this.moves}`;
      if (this.sound) {
        this.playAudio();
      }
      setTimeout(
        function () {
          this.renderField(this.matrix);
          this.#animationGo = false;
        }.bind(this),
        200
      );
    }
  }

  dragTile(e) {
    e.target.classList.add("dragging");
    this.#moveTarget = e.target;
  }

  dropTile(e) {
    e.preventDefault();
    if (e.target !== document.querySelector("#e0")) {
      this.#moveTarget.classList.remove("dragging");
      return;
    }
    if (e.target === document.querySelector("#e0")) {
      let value = +this.#moveTarget.textContent;
      this.updateMatrix(value);
      if (this.sound) {
        this.playAudio();
      }
      this.moves++;
      movesElement.textContent = `Moves: ${this.moves}`;
      this.renderField(this.matrix);
    }
  }

  // Generating and updating

  updateMatrix(value) {
    let tempMatrix = this.matrix.flat();
    const zeroIndex = tempMatrix.indexOf(0);
    const targetIndex = tempMatrix.indexOf(value);
    tempMatrix.splice(zeroIndex, 1, value);
    tempMatrix.splice(targetIndex, 1, 0);
    const res = [];
    for (let i = 0; i < this.typeF; i++) {
      res.push(tempMatrix.slice(i * this.typeF, (i + 1) * this.typeF));
    }
    this.matrix = res;
  }

  isDraggable() {
    this.#movable = [];
    document.querySelectorAll(".gem").forEach((elem) => {
      let value = +elem.textContent;
      const tileCoords = this.getCoords(value);
      const zeroCoords = this.getCoords(0);
      if (zeroCoords.x - tileCoords.x === 1 && zeroCoords.y === tileCoords.y) {
        this.#movable.push({ tile: elem, direction: "Right" });
      }
      if (zeroCoords.x - tileCoords.x === -1 && zeroCoords.y === tileCoords.y) {
        this.#movable.push({ tile: elem, direction: "Left" });
      }
      if (zeroCoords.y - tileCoords.y === 1 && zeroCoords.x === tileCoords.x) {
        this.#movable.push({ tile: elem, direction: "Bottom" });
      }
      if (zeroCoords.y - tileCoords.y === -1 && zeroCoords.x === tileCoords.x) {
        this.#movable.push({ tile: elem, direction: "Top" });
      }
    });
    this.#movable.forEach((element) => {
      element.tile.classList.add("draggable");
      element.tile.setAttribute("draggable", "true");
    });
  }

  getCoords(val) {
    let coords = {};
    this.matrix.forEach((el, i) => {
      el.forEach((elem, index) => {
        if (elem === val) coords.x = index;
      });
      if (el.includes(val)) coords.y = i;
    });
    return coords;
  }

  renderField(array) {
    pfWrapper.classList.remove("fieldSize3");
    pfWrapper.classList.remove("fieldSize4");
    pfWrapper.classList.remove("fieldSize8");
    pfWrapper.classList.remove("fieldRecords");
    pfWrapper.classList.add(`fieldSize${this.typeF}`);
    pfWrapper.replaceChildren();
    let count = 1;
    array.forEach((e) =>
      e.forEach((elem) => {
        pfWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="gem" id='e${elem}' data-position='${count}'>${elem}</div>`
        );
        count++;
      })
    );
    document.querySelector("#e0").classList.add("zero");
    document.querySelector("#e0").addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    this.isDraggable();
  }

  paused() {
    pfWrapper.replaceChildren();
    pfWrapper.insertAdjacentHTML(
      "beforeend",
      "<div class='pause'><h2>Game is Paused</h2></div>"
    );
  }

  playAudio() {
    const click = new Audio("../assets/audio/click.wav");
    click.play();
  }
}
