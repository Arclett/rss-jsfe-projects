import engData from "./engData.json";
import rusData from "./rusData.json";

export class Main {
  lang;
  constructor() {
    this.loadLang();
    this.bgSrc = "unplash";
    this.settingsWrapElem = document.querySelector(".settings-wrapper");
    this.renderSettings();
    this.footerElem = document.querySelector(".footer-wrapper");
    this.applyLang();
    //handlers

    this.footerElem.addEventListener("click", this.footerClick.bind(this));
    window.addEventListener("beforeunload", this.saveLang.bind(this));
  }

  saveLang() {
    localStorage.setItem("lang", `${this.lang}`);
    console.log("saved!");
  }

  loadLang() {
    if (localStorage.getItem("lang")) {
      this.lang = localStorage.getItem("lang");
      console.log("lang loaded");
    }
  }

  renderSettings() {
    this.langWrapperElem = document.createElement("div");
    this.langWrapperElem.className = "lang-discript";
    this.langWrapperElem.textContent = "Язык";
    this.settingsWrapElem.appendChild(this.langWrapperElem);
    //
    this.langRusElem = document.createElement("div");
    this.langRusElem.className = "rus active";
    this.langRusElem.textContent = "Русский";
    this.settingsWrapElem.appendChild(this.langRusElem);
    //
    this.langEngElem = document.createElement("div");
    this.langEngElem.className = "eng";
    this.langEngElem.textContent = "English";
    this.settingsWrapElem.appendChild(this.langEngElem);
    //
    this.bgSource = document.createElement("div");
    this.bgSource.className = "bg-source";
    this.bgSource.textContent = "Фон";
    this.settingsWrapElem.appendChild(this.bgSource);
    //
    this.unplashElem = document.createElement("div");
    this.unplashElem.className = "unplash active";
    this.unplashElem.textContent = "Unplash";
    this.settingsWrapElem.appendChild(this.unplashElem);
    //
    this.offlineElem = document.createElement("div");
    this.offlineElem.className = "offline";
    this.offlineElem.textContent = "Локальный";
    this.settingsWrapElem.appendChild(this.offlineElem);
    //
    this.changeBgElem = document.createElement("div");
    this.changeBgElem.className = "change-bg";
    this.changeBgElem.textContent = "Обновить фон";
    this.settingsWrapElem.appendChild(this.changeBgElem);
    //
    this.closeSettings = document.createElement("div");
    this.closeSettings.className = "close-settings";
    this.closeSettings.textContent = "Закрыть настройки";
    this.settingsWrapElem.appendChild(this.closeSettings);

    console.log("rendered!");
  }

  footerClick(e) {
    if (e.target.classList.contains("settings-btn")) {
      this.openSettings();
    }
    if (e.target.classList.contains("close-settings")) {
      this.closeSetting();
    }
    if (
      e.target.classList.contains("rus") ||
      e.target.classList.contains("eng")
    ) {
      this.choseLang();
    }
    if (
      e.target.classList.contains("unplash") ||
      e.target.classList.contains("offline")
    ) {
      this.choseSrc();
    }
  }

  choseLang() {
    this.lang = this.lang === "rus" ? "eng" : "rus";
    this.applyLang();
  }

  applyLang() {
    this.langRusElem.classList.toggle("active");
    this.langEngElem.classList.toggle("active");
    const data = this.lang === "rus" ? rusData[0] : engData[0];
    this.langWrapperElem.textContent = data.index.settings[0];
    this.bgSource.textContent = data.index.settings[1];
    this.offlineElem.textContent = data.index.settings[2];
    this.changeBgElem.textContent = data.index.settings[3];
    this.closeSettings.textContent = data.index.settings[4];
  }

  choseSrc() {
    this.unplashElem.classList.toggle("active");
    this.offlineElem.classList.toggle("active");
    this.lang = this.lang === "unplash" ? "offline" : "unplash";
  }

  openSettings() {
    this.settingsWrapElem.style.transform = "translateX(0)";
  }

  closeSetting() {
    this.settingsWrapElem.style.transform = null;
  }
}
