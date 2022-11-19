import birdData from "./birdData.json";

export class BirdCard {
  currentBird;
  constructor() {
    this.birdImageElem = document.querySelector(".bird-image");
    this.regNameElem = document.querySelector(".reg-name");
    this.speciesElem = document.querySelector(".latin-name");
    this.birdDescriptionElem = document.querySelector(".bird-description");
  }

  setBird(stage, num, data) {
    this.currentBird = data[stage][num];
    this.regNameElem.textContent = this.currentBird.name;
    this.speciesElem.textContent = this.currentBird.species;
    this.birdDescriptionElem.textContent = this.currentBird.description;
    this.birdImageElem.style.backgroundImage = `url(${this.currentBird.image})`;
  }
}
