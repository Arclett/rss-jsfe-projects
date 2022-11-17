export class Main {
  constructor() {
    this.lang = "rus";
    this.bgSrc = "unplash";
    this.settingsWrapElem = document.querySelector(".settings-wrapper");
    this.renderSettings();
    this.footerElem = document.querySelector(".footer-wrapper");
    //handlers

    this.footerElem.addEventListener("click", this.footerClick.bind(this));
  }
  renderSettings() {
    const langWrapperElem = document.createElement("div");
    langWrapperElem.className = "lang-discript";
    langWrapperElem.textContent = "Язык";
    this.settingsWrapElem.appendChild(langWrapperElem);
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
    const bgSource = document.createElement("div");
    bgSource.className = "bg-source";
    bgSource.textContent = "Фон";
    this.settingsWrapElem.appendChild(bgSource);
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
    this.langRusElem.classList.toggle("active");
    this.langEngElem.classList.toggle("active");
    this.lang = this.lang === "rus" ? "eng" : "rus";
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
