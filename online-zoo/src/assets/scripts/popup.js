export const popup = function () {
  const burgerElement = document.querySelector(".burger");
  const popupElement = document.querySelector(".popup-window");
  const overlayElement = document.querySelector(".overlay");
  const testimPopupElement = document.querySelector(".popup-testim");
  const showPopUp = function () {
    burgerElement.classList.toggle("burger-active");
    popupElement.classList.toggle("popup-show");
    overlayElement.classList.toggle("overlay-hidden");
  };
  burgerElement.addEventListener("click", function () {
    if (testimPopupElement.classList.contains("overlay-hidden")) {
      showPopUp();
    } else {
      testimPopupElement.classList.add("overlay-hidden");
      const popup = document.querySelector(".replay-popup");
      popup.remove();
      burgerElement.classList.toggle("burger-active");
      popupElement.classList.toggle("popup-show");
    }
  });
  overlayElement.addEventListener("click", function () {
    burgerElement.classList.remove("burger-active");
    popupElement.classList.remove("popup-show");
    overlayElement.classList.add("overlay-hidden");
    testimPopupElement.classList.add("overlay-hidden");
    const popup = document.querySelector(".replay-popup");
    popup.remove();
  });
  popupElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("burg-link")) {
      showPopUp();
    }
  });
};
