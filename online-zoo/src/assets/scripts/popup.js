export const popup = function () {
  const burgerElement = document.querySelector(".burger");
  const popupElement = document.querySelector(".popup-window");
  const overlayElement = document.querySelector(".overlay");
  const showPopUp = function () {
    burgerElement.classList.toggle("burger-active");
    popupElement.classList.toggle("popup-show");
    overlayElement.classList.toggle("overlay-hidden");
  };
  burgerElement.addEventListener("click", function () {
    showPopUp();
  });
  overlayElement.addEventListener("click", function () {
    showPopUp();
  });
  popupElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("burg-link")) {
      showPopUp();
    }
  });
};
