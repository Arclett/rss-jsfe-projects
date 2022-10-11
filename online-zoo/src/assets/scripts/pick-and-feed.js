export const pickAndFeed = function () {
  const progressLineElement = document.querySelector(".progress-bar-wrapper");
  const pricePointElement = document.querySelectorAll(".price-point");
  const pointElem = document.querySelectorAll(".progress-point");
  const anotherAmountElement = document.querySelector(".other-amount");

  //Prices for current resolution
  const priceArr = [];
  pricePointElement.forEach((e) => {
    if (getComputedStyle(e).display === "block")
      priceArr.push(e.firstChild.textContent);
  });
  // progress bar functionality
  anotherAmountElement.value = "100";
  const clearPoint = function () {
    pointElem.forEach((e) =>
      e.firstChild.classList.remove("border-active-one")
    );
    pricePointElement.forEach((e) => e.classList.remove("active-price"));
  };

  progressLineElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("progress-point")) {
      const selectedPrice = document.querySelector(`.${e.target.dataset.sum}`);
      clearPoint();
      e.target.firstChild.classList.add("border-active-one");
      selectedPrice.classList.add("active-price");
      anotherAmountElement.value = selectedPrice.textContent;
    }
  });

  //donate input field functionality
  const inputDonate = function () {
    const inputValue = anotherAmountElement.value;
    if (priceArr.includes(inputValue)) {
      clearPoint();
      pricePointElement.forEach((e) => {
        const selector = e.className.split(" ")[1];
        if (inputValue === document.querySelector(`.${selector}`).textContent) {
          e.classList.add("active-price");
          document
            .querySelector(`[data-sum = '${selector}']`)
            .firstChild.classList.add("border-active-one");
        }
      });
    } else {
      pointElem.forEach((e) =>
        e.firstChild.classList.remove("border-active-one")
      );
      pricePointElement.forEach((e) => e.classList.remove("active-price"));
    }
  };

  // anotherAmountElement.addEventListener("blur", inputDonate);
  anotherAmountElement.addEventListener("keyup", function () {
    inputDonate();
    // anotherAmountElement.blur();
  });
};
