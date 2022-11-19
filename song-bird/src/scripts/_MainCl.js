import engData from "./engData.json";
import rusData from "./rusData.json";

export class Main {
  lang;
  constructor() {
    this.loadStatus();
    this.settingsWrapElem = document.querySelector(".settings-wrapper");
    this.renderSettings();
    this.footerElem = document.querySelector(".footer-wrapper");
    this.changeBgElem = document.querySelector(".change-bg");
    this.applyLang();
    this.setBg();
    //handlers

    this.footerElem.addEventListener("click", this.footerClick.bind(this));
    this.changeBgElem.addEventListener("click", this.setBg.bind(this));
    window.addEventListener("beforeunload", this.saveStatus.bind(this));
  }

  saveStatus() {
    localStorage.setItem("lang", `${this.lang}`);
    localStorage.setItem("bg", `${this.bgSrc}`);
  }

  loadStatus() {
    if (localStorage.getItem("lang")) {
      this.lang = localStorage.getItem("lang");
    } else this.lang = "rus";
    if (localStorage.getItem("bg")) {
      this.bgSrc = localStorage.getItem("bg");
    } else this.bgSrc = "offline";
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

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
      this.choseBg();
    }
  }

  choseLang() {
    this.lang = this.lang === "rus" ? "eng" : "rus";
    this.applyLang();
  }

  choseBg() {
    this.bgSrc = this.bgSrc === "unplash" ? "offline" : "unplash";

    this.setBg();
  }

  applyLang() {
    this.langRusElem.classList.remove("active");
    this.langEngElem.classList.remove("active");
    if (this.lang === "rus") {
      this.langRusElem.classList.add("active");
    } else {
      this.langEngElem.classList.add("active");
    }
    const data = this.lang === "rus" ? rusData[0] : engData[0];
    this.langWrapperElem.textContent = data.index.settings[0];
    this.bgSource.textContent = data.index.settings[1];
    this.offlineElem.textContent = data.index.settings[2];
    this.changeBgElem.textContent = data.index.settings[3];
    this.closeSettings.textContent = data.index.settings[4];
  }

  openSettings() {
    this.settingsWrapElem.style.transform = "translateX(0)";
  }

  closeSetting() {
    this.settingsWrapElem.style.transform = null;
  }

  async setBg() {
    this.unplashElem.classList.remove("active");
    this.offlineElem.classList.remove("active");
    if (this.bgSrc === "unplash") {
      this.unplashElem.classList.add("active");
    } else {
      this.offlineElem.classList.add("active");
    }
    if (this.bgSrc === "unplash") {
      const imgLink = await this.getBgLink();
      const img = new Image();
      img.src = `${imgLink}`;
      img.addEventListener("load", function () {
        document.querySelector(
          ".body-wrapper"
        ).style.backgroundImage = `url('${imgLink}')`;
      });
      console.log("unplash loaded");
    } else {
      document.querySelector(
        ".body-wrapper"
      ).style.backgroundImage = `url("../assets/img/default-bg-${this.randomInt(
        1,
        10
      )}.jpg")`;
      console.log("local loaded");
    }
  }

  async getBgLink() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=bird&client_id=n--SK77UqCI2ztzPFUUgJKS4GEwIgThxk3MK1623O5c`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
  }
}
