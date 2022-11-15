import "../styles/main.scss";
import birdData from "../scripts/birdData.json";
import { BirdCard } from "../scripts/_birdCard";

class Gallery {
  galleryPosition;
  constructor() {
    this.galleryPosition = 0;
    this.galleryElem = document.querySelector(".gallery-wrapper");
    this.renderGallery();
    this.arrowBack = document.querySelector(".back");
    this.arrowFwd = document.querySelector(".fwd");
    this.popupElem = document.querySelector(".popup");
    this.birdCardElem = document.querySelector(".bird-card");
    this.arrowFwd.addEventListener("click", this.galleryFwd.bind(this));
    this.arrowBack.addEventListener("click", this.galleryBack.bind(this));
    this.galleryElem.addEventListener("click", this.popup.bind(this));
  }

  galleryFwd() {
    if (this.galleryPosition !== 83.3) {
      this.galleryPosition += 16.66;
    } else {
      this.galleryPosition = 0;
    }
    this.galleryElem.style = `transform: translateX(-${this.galleryPosition}%)`;
  }

  galleryBack() {
    if (this.galleryPosition !== 0) {
      this.galleryPosition -= 16.66;
    } else {
      this.galleryPosition = 83.3;
    }
    this.galleryElem.style = `transform: translateX(-${this.galleryPosition}%)`;
  }

  renderGallery() {
    birdData.forEach((e) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      this.galleryElem.appendChild(slide);
      e.forEach((elem) => {
        const galPart = document.createElement("div");
        galPart.className = "gal-part";
        galPart.style.backgroundImage = `url(${elem.image})`;
        galPart.setAttribute("data-species", `${elem.species}`);
        slide.appendChild(galPart);
      });
    });
  }

  popup(e) {
    if (e.target.classList.contains("gal-part")) {
      const species = e.target.dataset.species;
      //   console.log(species);
      //   const currentBird = birdData.flat().find((e) => e.species === species);
      let stage, bird;
      birdData.forEach((e, i) => {
        e.forEach((elem) => {
          if (elem.species === species) {
            bird = elem.id;
            stage = i;
          }
        });
      });
      console.log(stage);
      birdGal.setBird(stage, bird - 1);
      this.birdCardElem.classList.remove("hidden");
    }
  }
}
const birdGal = new BirdCard();
const gal = new Gallery();
