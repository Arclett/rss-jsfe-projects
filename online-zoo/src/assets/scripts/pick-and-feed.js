export const pickAndFeed = function () {
  const progressLineElement = document.querySelector(".progress-bar-wrapper");
  const pricePointElement = document.querySelectorAll(".price-point");
  progressLineElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("progress-point")) {
      const select = e.target.dataset.sum;
      console.log(select);
      pricePointElement.forEach((e) => e.classList.remove("active-price"));
      document.querySelector(`.${select}`).classList.add("active-price");
    }
  });
};
