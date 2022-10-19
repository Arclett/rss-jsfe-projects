const pfWrapper = document.querySelector(".play-field-wrapper");

export class PlayField {
  constructor(matrix) {
    this.matrix = matrix;
    this.renderField(this.matrix);
    pfWrapper.addEventListener("click", this.moveTile.bind(this));
  }

  renderField(array) {
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
  }

  moveTile(e) {
    if (e.target.classList.contains("gem")) {
      let value = +e.target.textContent;
      const tileCoords = this.getCoords(value);
      const zeroCoords = this.getCoords(0);
      console.log(zeroCoords, tileCoords);
      console.log(zeroCoords.x - tileCoords.x);
      console.log(e.target);
      let zeroPos;
      let tempMatrix = this.matrix.flat();
      if (zeroCoords.x - tileCoords.x === 1 && zeroCoords.y === tileCoords.y) {
        e.target.classList.add("moveRight");
        zeroPos = document.querySelector(
          `[data-position='${+e.target.dataset.position + 1}']`
        );
      } else if (
        zeroCoords.x - tileCoords.x === -1 &&
        zeroCoords.y === tileCoords.y
      ) {
        e.target.classList.add("moveLeft");
        zeroPos = document.querySelector(
          `[data-position='${+e.target.dataset.position - 1}']`
        );
        console.log(zeroPos);
      } else if (
        zeroCoords.y - tileCoords.y === 1 &&
        zeroCoords.x === tileCoords.x
      ) {
        e.target.classList.add("moveBottom");
        zeroPos = document.querySelector(
          `[data-position='${+e.target.dataset.position + this.matrix.length}']`
        );
        console.log(zeroPos);
      } else if (
        zeroCoords.y - tileCoords.y === -1 &&
        zeroCoords.x === tileCoords.x
      ) {
        e.target.classList.add("moveTop");
        zeroPos = document.querySelector(
          `[data-position='${+e.target.dataset.position - this.matrix.length}']`
        );
        console.log(zeroPos);
      } else {
        return;
      }
      const zeroIndex = tempMatrix.indexOf(0);
      const targetIndex = tempMatrix.indexOf(value);
      tempMatrix.splice(zeroIndex, 1, value);
      tempMatrix.splice(targetIndex, 1, 0);
      const res = [];
      for (let i = 0; i < this.matrix.length; i++) {
        res.push(tempMatrix.slice(i * 4, (i + 1) * 4));
      }
      this.matrix = res;
      setTimeout(
        function () {
          this.renderField(res);
          console.log(this.matrix);
        }.bind(this),
        500
      );
    }
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
}
