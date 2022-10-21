(()=>{"use strict";const t=document.querySelector(".play-field-wrapper");class e{#t;#e;#i;constructor(e){this.matrix=e,this.renderField(this.matrix),t.addEventListener("click",this.moveTile.bind(this)),this.#t=!1,t.addEventListener("dragstart",this.dragTile.bind(this)),t.addEventListener("drop",this.dropTile.bind(this)),t.addEventListener("dragend",this.dropTile.bind(this))}moveTile(t){if(t.target.classList.contains("gem")&&!1===this.#t&&t.target!==document.querySelector("#e0")){this.#t=!0;let e=+t.target.textContent;if(!this.#i.some((e=>e.tile===t.target)))return void(this.#t=!1);{let e;this.#i.forEach((i=>{t.target===i.tile&&(e=i.direction)})),t.target.classList.add(`move${e}`)}this.updateMatrix(e),setTimeout(function(){this.renderField(this.matrix),this.#t=!1}.bind(this),200)}}dragTile(t){t.target.classList.add("dragging"),this.#e=t.target}dropTile(t){if(t.preventDefault(),t.target===document.querySelector("#e0")){if(t.target===document.querySelector("#e0")){let t=+this.#e.textContent;this.updateMatrix(t),this.renderField(this.matrix)}}else this.#e.classList.remove("dragging")}updateMatrix(t){let e=this.matrix.flat();const i=e.indexOf(0),r=e.indexOf(t);e.splice(i,1,t),e.splice(r,1,0);const a=[];for(let t=0;t<this.matrix.length;t++)a.push(e.slice(4*t,4*(t+1)));this.matrix=a}isDraggable(){this.#i=[],document.querySelectorAll(".gem").forEach((t=>{let e=+t.textContent;const i=this.getCoords(e),r=this.getCoords(0);r.x-i.x==1&&r.y===i.y&&this.#i.push({tile:t,direction:"Right"}),r.x-i.x==-1&&r.y===i.y&&this.#i.push({tile:t,direction:"Left"}),r.y-i.y==1&&r.x===i.x&&this.#i.push({tile:t,direction:"Bottom"}),r.y-i.y==-1&&r.x===i.x&&this.#i.push({tile:t,direction:"Top"})})),this.#i.forEach((t=>{t.tile.classList.add("draggable"),t.tile.setAttribute("draggable","true")}))}getCoords(t){let e={};return this.matrix.forEach(((i,r)=>{i.forEach(((i,r)=>{i===t&&(e.x=r)})),i.includes(t)&&(e.y=r)})),e}renderField(e){t.replaceChildren();let i=1;e.forEach((e=>e.forEach((e=>{t.insertAdjacentHTML("beforeend",`<div class="gem" id='e${e}' data-position='${i}'>${e}</div>`),i++})))),document.querySelector("#e0").classList.add("zero"),document.querySelector("#e0").addEventListener("dragover",(function(t){t.preventDefault()})),this.isDraggable()}}new class{constructor(){this.matrix=this.generateMatrix(4),new e(this.matrix)}generateMatrix(t){let e=[];for(;e.length<Math.pow(t,2);){let i=this.getRandomInt(0,Math.pow(t,2)-1);e.includes(i)||e.push(i)}let i=[];for(let r=0;r<t;r++)i.push(e.slice(4*r,4*(r+1)));return i}getRandomInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}}})();