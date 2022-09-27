export const animation = function () {
  //button-animation

  const buttonElement = document.querySelectorAll(".button");
  buttonElement.forEach((el) =>
    el.addEventListener("mousedown", function () {
      el.classList.add("link-active");
    })
  );
  buttonElement.forEach((el) =>
    el.addEventListener("mouseup", function () {
      el.classList.remove("link-active");
    })
  );

  //pet-card animation
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

  // footer form validation

  const submElem = document.querySelector(".email-subm");
  const emailInpElem = document.querySelector(".email-inp");

  window.addEventListener("keyup", function () {
    console.log("kla");
    if (emailInpElem.checkValidity()) submElem.style.color = "green";
    else submElem.style.color = "red";
  });

  // progress-bar animation

  const pointElem = document.querySelectorAll(".progress-point");
  pointElem.forEach((elem) =>
    elem.addEventListener("click", function () {
      document
        .querySelectorAll(".border-one")
        .forEach((elem) => elem.classList.remove("border-active-one"));
      elem.querySelector(".border-one").classList.add("border-active-one");
    })
  );
};
