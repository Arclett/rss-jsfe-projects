(()=>{"use strict";const t=JSON.parse('[{"index":{"main":["Gallery","Quiz"],"settings":["Язык","Фон","Локальный","Поменять фон","Закрыть настройки"]},"quiz":{"stages":["Разминка","Воробьиные","Лесные птицы","Певчие птицы","Хищные птицы","Морские птицы"],"guess":["Угадайте птицу по пению","Правильно! Это ","Неверно! Попробуйте ещё раз."],"cardPh":"Послушайте плеер и выберете птицу из списка выше","next":"Следующий уровень","score":"Очки: "},"result":{"congrats":"Поздравляем!","res":["Вы набрали "," из 30 возможных баллов!","Вы набрали максимальное количество баллов!"],"togal":"Посмотреть галерею","tryagain":"Попробовать ещё раз"}}]'),e=JSON.parse('[{"index":{"main":["Gallery","Quiz"],"settings":["Languge","Background","Offline","Change background","Close settings"]},"quiz":{"stages":["Warm-up","Passerines","Forest birds","Song birds","Predatory birds","Sea birds"],"guess":["Guess the bird by the song","Right! It\'s ","Wrong! Try again."],"cardPh":"Listen to the player and choose a bird from the list","next":"Next stage","score":"Score"},"result":{"congrats":"Congratulations!","res":["You scored "," out of 30 points!","You have scored the maximum points!"],"togal":"Watch Gallery","tryagain":"Try again"}}]');class s{lang;constructor(){this.loadStatus(),this.settingsWrapElem=document.querySelector(".settings-wrapper"),this.renderSettings(),this.footerElem=document.querySelector(".footer-wrapper"),this.changeBgElem=document.querySelector(".change-bg"),this.bodyElem=document.querySelector(".body-wrapper"),this.applyLang(),this.setBg(),this.footerElem.addEventListener("click",this.footerClick.bind(this)),this.changeBgElem.addEventListener("click",this.setBg.bind(this)),window.addEventListener("beforeunload",this.saveStatus.bind(this))}saveStatus(){localStorage.setItem("lang",`${this.lang}`),localStorage.setItem("bg",`${this.bgSrc}`)}loadStatus(){localStorage.getItem("lang")?this.lang=localStorage.getItem("lang"):this.lang="rus",localStorage.getItem("bg")?this.bgSrc=localStorage.getItem("bg"):this.bgSrc="offline"}renderSettings(){this.langWrapperElem=document.createElement("div"),this.langWrapperElem.className="lang-discript",this.langWrapperElem.textContent="Язык",this.settingsWrapElem.appendChild(this.langWrapperElem),this.langRusElem=document.createElement("div"),this.langRusElem.className="rus active",this.langRusElem.textContent="Русский",this.settingsWrapElem.appendChild(this.langRusElem),this.langEngElem=document.createElement("div"),this.langEngElem.className="eng",this.langEngElem.textContent="English",this.settingsWrapElem.appendChild(this.langEngElem),this.bgSource=document.createElement("div"),this.bgSource.className="bg-source",this.bgSource.textContent="Фон",this.settingsWrapElem.appendChild(this.bgSource),this.unplashElem=document.createElement("div"),this.unplashElem.className="unplash active",this.unplashElem.textContent="Unplash",this.settingsWrapElem.appendChild(this.unplashElem),this.offlineElem=document.createElement("div"),this.offlineElem.className="offline",this.offlineElem.textContent="Локальный",this.settingsWrapElem.appendChild(this.offlineElem),this.changeBgElem=document.createElement("div"),this.changeBgElem.className="change-bg",this.changeBgElem.textContent="Обновить фон",this.settingsWrapElem.appendChild(this.changeBgElem),this.closeSettings=document.createElement("div"),this.closeSettings.className="close-settings",this.closeSettings.textContent="Закрыть настройки",this.settingsWrapElem.appendChild(this.closeSettings),console.log("rendered!")}randomInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}footerClick(t){t.target.classList.contains("settings-btn")&&this.openSettings(),t.target.classList.contains("close-settings")&&this.closeSetting(),(t.target.classList.contains("rus")||t.target.classList.contains("eng"))&&this.choseLang(),(t.target.classList.contains("unplash")||t.target.classList.contains("offline"))&&this.choseBg()}choseLang(){this.lang="rus"===this.lang?"eng":"rus",this.applyLang()}choseBg(){this.bgSrc="unplash"===this.bgSrc?"offline":"unplash",this.setBg()}applyLang(){this.langRusElem.classList.remove("active"),this.langEngElem.classList.remove("active"),"rus"===this.lang?this.langRusElem.classList.add("active"):this.langEngElem.classList.add("active");const s="rus"===this.lang?t[0]:e[0];this.langWrapperElem.textContent=s.index.settings[0],this.bgSource.textContent=s.index.settings[1],this.offlineElem.textContent=s.index.settings[2],this.changeBgElem.textContent=s.index.settings[3],this.closeSettings.textContent=s.index.settings[4]}openSettings(){this.settingsWrapElem.style.transform="translateX(0)"}closeSetting(){this.settingsWrapElem.style.transform=null}async setBg(){if(this.unplashElem.classList.remove("active"),this.offlineElem.classList.remove("active"),"unplash"===this.bgSrc?this.unplashElem.classList.add("active"):this.offlineElem.classList.add("active"),"unplash"===this.bgSrc){const t=await this.getBgLink(),e=new Image;e.src=`${t}`,e.addEventListener("load",(function(){document.querySelector(".body-wrapper").style.backgroundImage=`url('${t}')`})),console.log("unplash loaded")}else{const t=this.bodyElem.classList.contains("index")?".":"..";this.bodyElem.style.backgroundImage=`url("${t}/assets/img/default-bg-${this.randomInt(1,10)}.jpg")`,console.log("local loaded")}}async getBgLink(){const t=await fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=bird&client_id=n--SK77UqCI2ztzPFUUgJKS4GEwIgThxk3MK1623O5c");return(await t.json()).urls.regular}}new class extends s{constructor(){super(),this.setLang(),this.footerElem.addEventListener("click",this.changeLang.bind(this))}changeLang(t){(t.target.classList.contains("rus")||t.target.classList.contains("eng"))&&this.setLang()}setLang(){document.querySelector(".gallery-label").textContent="rus"===this.lang?"Галерея":"Gallery",document.querySelector(".quiz-label").textContent="rus"===this.lang?"Викторина":"Quiz"}}})();