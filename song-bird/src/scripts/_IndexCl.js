import { Main } from "./_MainCl";

export class IndexCl extends Main {
  constructor() {
    super();
    this.setLang();
    this.footerElem.addEventListener("click", this.changeLang.bind(this));
  }
  changeLang(e) {
    if (
      e.target.classList.contains("rus") ||
      e.target.classList.contains("eng")
    )
      this.setLang();
  }

  setLang() {
    document.querySelector(".gallery-label").textContent =
      this.lang === "rus" ? "Галерея" : "Gallery";
    document.querySelector(".quiz-label").textContent =
      this.lang === "rus" ? "Викторина" : "Quiz";
  }
}
