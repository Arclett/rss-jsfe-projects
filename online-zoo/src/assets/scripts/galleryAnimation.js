import { galleryArray } from "./gallery";
export const galleryAnimation = function () {
  const arrowRightElement = document.querySelector(".arrow-right");
  const arrowLeftElement = document.querySelector(".arrow-left");
  const galleryWrapperElement = document.querySelector(".gallery-wrapper");

  // support function

  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const generateRandomPets = function (length) {
    let pets = [];
    while (pets.length < length) {
      const i = randomInt(0, 11);
      if (!pets.includes(galleryArray[i])) {
        pets.push(galleryArray[i]);
      }
    }
    return pets;
  };

  // function fill slide with random pet cards

  const generateSlide = function (slide) {
    const galleryElement = document.querySelector(`.${slide}`);
    const galItemElement = galleryElement.querySelectorAll(".gal-item");
    let visibleGalElem = [];
    galItemElement.forEach((e) => {
      if (getComputedStyle(e).display === "block") visibleGalElem.push(e);
    });
    const petsGal = generateRandomPets(visibleGalElem.length);
    visibleGalElem.forEach((e, i) => {
      e.insertAdjacentHTML(
        "afterbegin",
        `<div class="pet-card ${petsGal[i].source}">
        <div class="pet-info">${petsGal[i].info}
        </div>
      </div>
      <div class="${petsGal[i].foodType}">
        <p>
          <span>${petsGal[i].petName}</span><br />${petsGal[i].location}
        </p>
      </div>`
      );
    });
    const petCardElement = document.querySelectorAll(".pet-card");
    petCardElement.forEach((el) =>
      el.addEventListener("mouseover", function (e) {
        el.style.transform = "translateY(-10%) scale(1.2)";
        el.querySelector(".pet-info").style.transform = "translateY(0)";
      })
    );
    petCardElement.forEach((el) =>
      el.addEventListener("mouseout", function (e) {
        el.style.transform = "translateY(0%) scale(1)";
        el.querySelector(".pet-info").style.transform = "translateY(100%)";
      })
    );
  };

  // initial

  generateSlide("slide1");
  generateSlide("slide2");
  generateSlide("slide3");

  // moving gallery

  let slidePosition = 2;
  let animation = false;
  arrowRightElement.addEventListener("click", function () {
    if (!animation) {
      animation = true;
      if (slidePosition === 2) {
        generateSlide("slide3");
        galleryWrapperElement.classList.add("toRight");
        slidePosition = 3;
      } else if (slidePosition === 3) {
        generateSlide("slide1");
        galleryWrapperElement.classList.remove("toRight");
        galleryWrapperElement.classList.add("toLeft");
        slidePosition = 1;
      } else if (slidePosition === 1) {
        generateSlide("slide2");
        galleryWrapperElement.classList.remove("toLeft");
        slidePosition = 2;
      }
      setTimeout(function () {
        animation = false;
      }, 700);
    }
  });
  arrowLeftElement.addEventListener("click", function () {
    if (!animation) {
      animation = true;
      if (slidePosition === 2) {
        generateSlide("slide1");
        galleryWrapperElement.classList.add("toLeft");
        slidePosition = 1;
      } else if (slidePosition === 3) {
        generateSlide("slide2");
        galleryWrapperElement.classList.remove("toRight");
        slidePosition = 2;
      } else if (slidePosition === 1) {
        generateSlide("slide3");
        galleryWrapperElement.classList.remove("toLeft");
        galleryWrapperElement.classList.add("toRight");
        slidePosition = 3;
      }
      setTimeout(function () {
        animation = false;
      }, 700);
    }
  });
};
