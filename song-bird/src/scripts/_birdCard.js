import birdData from "./birdData.json";

export const birdCard = function (stage, num) {
  const birdImageElem = document.querySelector(".bird-image");
  const regNameElem = document.querySelector(".reg-name");
  const speciesElem = document.querySelector(".latin-name");
  const birdDescriptionElem = document.querySelector(".bird-description");

  let currentBird;

  const setBird = function (num) {
    currentBird = birdData[stage][num];
    regNameElem.textContent = currentBird.name;
    speciesElem.textContent = currentBird.species;
    birdDescriptionElem.textContent = currentBird.description;
    console.log(currentBird);
    birdImageElem.style.backgroundImage = `url(${currentBird.image})`;
  };
  setBird(num);

  const setStage = function () {};
};
