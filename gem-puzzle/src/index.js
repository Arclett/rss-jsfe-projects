import "/styles/main.scss";

const pfWrapper = document.querySelector(".play-field-wrapper");
const gameMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];

class PlayField {
  constructor() {
    this.generateField(gameMatrix);
  }

  generateField(array) {
    array.forEach((e) =>
      e.forEach((elem) => {
        pfWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="gem" id='e${elem}'></div>`
        );
      })
    );
  }
}

const game1 = new PlayField();
