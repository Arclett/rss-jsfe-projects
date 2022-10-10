import { userReplayArray } from "./user-replays";
export const testimonials = function () {
  const innerWrapperElement = document.querySelector(".replays-inner-wrapper");
  const replayWrapperElement = document.querySelector(".replays-wrapper");
  const scrollInputElement = document.querySelector(".scroll-bar");
  const testimPopupElement = document.querySelector(".popup-testim");
  const overlayElement = document.querySelector(".overlay");
  const testimCrossElement = document.querySelector(".testim-cross");
  let width = document
    .querySelector(".body-wrapper")
    .getBoundingClientRect().width;

  //generate replays fom array

  const fillReplayGallery = function () {
    width = document
      .querySelector(".body-wrapper")
      .getBoundingClientRect().width;
    if (width > 640) {
      userReplayArray.forEach((e, i) => {
        innerWrapperElement.insertAdjacentHTML(
          "beforeend",
          `<div class="replay rep${i + 1}">
      <div class="replay-inner">
        <img class="userpic" src=${e.avatar} alt="avatar">
        <h3>${e.userName}</h3>
        Local Austria<span></span>${e.date}
        <p>${e.text}</p>
        </div>
        </div>`
        );
      });
    } else {
      userReplayArray.forEach((e, i) => {
        if (i < 3) {
          innerWrapperElement.insertAdjacentHTML(
            "beforeend",
            `<div class="replay rep${i + 1}">
        <div class="replay-inner">
          <img class="userpic" src=${e.avatar} alt="avatar">
          <h3>${e.userName}</h3>
          Local Austria<span></span>${e.date}
          <p>${e.text}</p>
          </div>
          </div>`
          );
        }
      });
    }
  };
  fillReplayGallery();

  // refill when window resized

  const observerCallback = function () {
    width = document
      .querySelector(".body-wrapper")
      .getBoundingClientRect().width;
    if (width === 1000 || width === 1600 || width >= 640)
      document.querySelectorAll(".replay").forEach((e) => e.remove());
    fillReplayGallery();
  };

  const resize = new ResizeObserver(observerCallback);
  resize.observe(replayWrapperElement);

  // scroll-bar functionality

  scrollInputElement.addEventListener("input", function () {
    let x;
    if (width >= 1600) {
      x = 9.2;
    } else if (width < 1600 && width >= 1000) {
      x = 12.4;
    } else {
      x = 18.2;
    }
    innerWrapperElement.style.transform = `translateX(-${
      x * scrollInputElement.value
    }%)`;
  });

  // popup

  innerWrapperElement.addEventListener("click", function (e) {
    if (width <= 640) {
      if (e.target.closest(".replay")) {
        const replNumber = e.target.closest(".replay").className.slice(-1);
        testimPopupElement.insertAdjacentHTML(
          "beforeend",
          `<div class="replay-popup rep1">
    <div class="replay-inner-popup">
      <img class="userpic" src='${
        userReplayArray[replNumber - 1].avatar
      }' alt="avatar">
      <h3>${userReplayArray[replNumber - 1].userName}</h3>
      Local Austria<span></span>${userReplayArray[replNumber - 1].date}
      <p>${userReplayArray[replNumber - 1].text}</p>
    </div>
  </div>`
        );
        testimPopupElement.classList.remove("overlay-hidden");
        overlayElement.classList.remove("overlay-hidden");
        setTimeout(function () {
          document.querySelector(".replay-popup").style.opacity = "1";
          testimCrossElement.style.opacity = "1";
        }, 100);
      }
    }
  });
  testimPopupElement.addEventListener("click", function (e) {
    if (e.target === testimPopupElement || e.target === testimCrossElement) {
      overlayElement.classList.add("overlay-hidden");
      testimPopupElement.classList.add("overlay-hidden");
      const popup = document.querySelector(".replay-popup");
      popup.remove();
    }
  });
};
