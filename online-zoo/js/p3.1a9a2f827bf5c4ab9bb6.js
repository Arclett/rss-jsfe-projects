(()=>{"use strict";!function(){const e=document.querySelectorAll(".button");e.forEach((e=>e.addEventListener("mousedown",(function(){e.classList.add("link-active")})))),e.forEach((e=>e.addEventListener("mouseup",(function(){e.classList.remove("link-active")}))));const t=document.querySelector(".email-subm"),o=document.querySelector(".email-inp");window.addEventListener("keyup",(function(){o.checkValidity()?t.style.color="green":t.style.color="red"}))}(),function(){const e=document.querySelector(".progress-bar-wrapper"),t=document.querySelectorAll(".price-point"),o=document.querySelectorAll(".progress-point"),c=document.querySelector(".other-amount"),s=[];t.forEach((e=>{"block"===getComputedStyle(e).display&&s.push(e.firstChild.textContent)})),c.value="100";const r=function(){o.forEach((e=>e.firstChild.classList.remove("border-active-one"))),t.forEach((e=>e.classList.remove("active-price")))};e.addEventListener("click",(function(e){if(e.target.classList.contains("progress-point")){const t=document.querySelector(`.${e.target.dataset.sum}`);r(),e.target.firstChild.classList.add("border-active-one"),t.classList.add("active-price"),c.value=t.textContent}})),c.addEventListener("keyup",(function(){!function(){const e=c.value;s.includes(e)?(r(),t.forEach((t=>{const o=t.className.split(" ")[1];e===document.querySelector(`.${o}`).textContent&&(t.classList.add("active-price"),document.querySelector(`[data-sum = '${o}']`).firstChild.classList.add("border-active-one"))}))):(o.forEach((e=>e.firstChild.classList.remove("border-active-one"))),t.forEach((e=>e.classList.remove("active-price"))))}()}))}(),function(){const e=document.querySelector(".burger"),t=document.querySelector(".popup-window"),o=document.querySelector(".overlay"),c=document.querySelector(".popup-testim"),s=function(){e.classList.toggle("burger-active"),t.classList.toggle("popup-show"),o.classList.toggle("overlay-hidden")};e.addEventListener("click",(function(o){o.target.closest(".donate-header")||c.classList.contains("overlay-hidden")?s():(c.classList.add("overlay-hidden"),document.querySelector(".replay-popup").remove(),e.classList.toggle("burger-active"),t.classList.toggle("popup-show"))})),o.addEventListener("click",(function(){e.classList.remove("burger-active"),t.classList.remove("popup-show"),o.classList.add("overlay-hidden"),c.classList.add("overlay-hidden"),document.querySelector(".replay-popup").remove()})),t.addEventListener("click",(function(e){e.target.classList.contains("burg-link")&&s()}))}()})();