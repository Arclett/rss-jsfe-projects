import birdData from "../scripts/birdData.json";
import birdsDataEn from "./_birdEngData";
import { Main } from "./_MainCl";
import { galPlayer, birdGal } from "../pages/gallery";

export class Gallery extends Main {
  galleryPosition;
  galleryBird;
  constructor() {
    super();
    this.birdData = this.lang === "rus" ? birdData : birdsDataEn;
    this.galleryPosition = 0;
    this.galleryElem = document.querySelector(".gallery-slider");
    this.renderGallery();
    this.arrowBack = document.querySelector(".back");
    this.arrowFwd = document.querySelector(".fwd");
    this.popupElem = document.querySelector(".popup");
    this.overlayElem = document.querySelector(".overlay");
    this.galleryMainElem = document.querySelector(".gallery-main");

    this.galleryMainElem.addEventListener("click", this.mainHandler.bind(this));
    this.footerElem.addEventListener("click", this.setLang.bind(this));
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
      this.popupClose();
    }
  }

  galleryFwd(e) {
    console.log("fwd!");
    console.log(this.galleryPosition);
    if (Math.round(this.galleryPosition) !== 83) {
      this.galleryPosition += 16.66;
    } else {
      this.galleryPosition = 0;
    }
    this.galleryElem.style = `transform: translateX(-${this.galleryPosition}%)`;
  }

  galleryBack(e) {
    console.log("back!");
    console.log(this.galleryPosition);
    if (Math.round(this.galleryPosition) !== 0) {
      this.galleryPosition -= 16.66;
      this.galleryPosition.toFixed(1);
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
      this.birdData.forEach((e, i) => {
        e.forEach((elem) => {
          if (elem.species === species) {
            galPlayer.audio.src = elem.audio;
            bird = elem.id;
            stage = i;
          }
        });
      });
      birdGal.setBird(stage, bird - 1, this.birdData);
      this.popupElem.classList.remove("hide");
      this.overlayElem.classList.remove("hide");
    }
  }

  popupClose(e) {
    this.popupElem.classList.add("hide");
    this.overlayElem.classList.add("hide");
    galPlayer.audioPaused();
    galPlayer.playTime = 0;
  }

  getBird() {
    return this.galleryBird;
  }

  setLang(e) {
    if (
      e.target.classList.contains("eng") ||
      e.target.classList.contains("rus")
    ) {
      let data;
      if (this.lang === "rus") {
        this.birdData = birdData;
      } else {
        this.birdData = birdsDataEn;
      }
    }
  }
}
