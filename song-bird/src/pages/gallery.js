import "../styles/main.scss";
import birdData from "../scripts/birdData.json";
import { BirdCard } from "../scripts/_birdCard";

class Gallery {
  galleryPosition;
  galleryBird;
  constructor() {
    this.galleryPosition = 0;
    this.galleryElem = document.querySelector(".gallery-slider");
    this.renderGallery();
    this.arrowBack = document.querySelector(".back");
    this.arrowFwd = document.querySelector(".fwd");
    this.popupElem = document.querySelector(".popup");
    this.overlayElem = document.querySelector(".overlay");
    // this.closeElem = document.querySelector("close");
    this.galleryMainElem = document.querySelector(".gallery-main");

    // this.arrowFwd.addEventListener("click", this.galleryFwd.bind(this));
    // this.arrowBack.addEventListener("click", this.galleryBack.bind(this));
    // this.galleryElem.addEventListener("click", this.popup.bind(this));
    this.galleryMainElem.addEventListener("click", this.mainHandler.bind(this));
  }

  mainHandler(e) {
    if (e.target.classList.contains("back")) {
      this.galleryBack();
    }
    if (e.target.classList.contains("fwd")) {
      this.galleryFwd();
    }
    if (e.target.classList.contains("gal-part")) {
      this.popup(e);
    }
    if (
      e.target.classList.contains("close") ||
      e.target.classList.contains("overlay")
    ) {
      this.poupClose();
    }
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
      let stage, bird;
      birdData.forEach((e, i) => {
        e.forEach((elem) => {
          if (elem.species === species) {
            this.galleryBird = elem;
            bird = elem.id;
            stage = i;
          }
        });
      });
      birdGal.setBird(stage, bird - 1);
      this.popupElem.classList.remove("hide");
      this.overlayElem.classList.remove("hide");
    }
  }

  poupClose(e) {
    this.popupElem.classList.add("hide");
    this.overlayElem.classList.add("hide");
  }

  getBird() {
    return this.galleryBird;
  }
}
const birdGal = new BirdCard();
const gal = new Gallery();
