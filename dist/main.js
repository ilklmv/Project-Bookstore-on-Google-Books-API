(()=>{var e={845:()=>{const e=document.querySelector(".slider"),t=document.querySelectorAll(".slide"),n=t[0].clientWidth;let o=0;const r=document.querySelectorAll(".slider-dot");function s(){const t=-o*n;e.style.transform=`translateX(${t}px)`,r.forEach(((e,t)=>{t===o?e.classList.add("active"):e.classList.remove("active")}))}r.forEach(((e,t)=>{e.addEventListener("click",(()=>{o=t,s()}))})),setInterval((function(){o=(o+1)%t.length,s()}),5e3),s()},892:()=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".category-list"),t=document.querySelector(".book-list"),n=document.querySelector(".load-more"),o=["Architecture","Art & Fashion","Biography","Business","Crafts & Hobbies","Drama","Fiction","Food & Drink","Health & Wellbeing","History & Politics","Humor","Poetry","Psychology","Science","Technology","Travel & Maps"];o.forEach((t=>{const n=document.createElement("li");n.textContent=t,e.appendChild(n)})),e.addEventListener("click",(t=>{if("LI"===t.target.tagName){const n=e.querySelector(".active");n&&n.classList.remove("active"),t.target.classList.add("active"),s(t.target.textContent)}})),s(o[0]);let r=0;function s(e,o=0){fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${e}&key=AIzaSyCH4sChyw7m5slJRApx0EyonVpOpBs8Qfk&printType=books&startIndex=${o}&maxResults=6&langRestrict=en`).then((e=>e.json())).then((e=>{0===o&&(t.innerHTML=""),e.items.forEach((e=>{const n=e.volumeInfo,o=n.authors?n.authors.join(", "):"Unknown",r=n.imageLinks?n.imageLinks.thumbnail:"placeholder.png";let s="";if(n.averageRating){const e=Math.round(n.averageRating);s="★".repeat(e)+"☆".repeat(5-e)}else s="No ratings available";const a=n.averageRating?`${n.averageRating} (${n.ratingsCount} ratings)`:"",i=n.description?n.description.substring(0,150)+"...":"No description available",c=n.saleInfo&&n.saleInfo.listPrice?`${n.saleInfo.listPrice.amount} ${n.saleInfo.listPrice.currencyCode}`:"",l=document.createElement("div");l.classList.add("book-card"),l.innerHTML=`\n                        <img src="${r}" alt="${n.title}">\n                        <div class="text-info">\n                        <p class="authors">${o}</p>\n                        <h3>${n.title}</h3>\n                        <p class="rating">${a}</p>\n                        <p class="description">${i}</p>\n                        <p class="price">${c}</p>\n                        <button class="buy-button">Buy now</button>\n                        </div>\n                    `,t.appendChild(l);l.querySelector(".buy-button").addEventListener("click",(()=>{!function(e,t){const n=JSON.parse(localStorage.getItem("cart"))||[],o=n.findIndex((t=>t.id===e.id));-1===o?(n.push({id:e.id,title:e.title}),t.querySelector(".buy-button").classList.add("in-cart")):(n.splice(o,1),t.querySelector(".buy-button").classList.remove("in-cart"));localStorage.setItem("cart",JSON.stringify(n))}(n,l)}))})),e.totalItems<=o+6?n.style.display="none":n.style.display="block"})).catch((e=>{console.error(e)}))}n.addEventListener("click",(()=>{r+=6;const t=e.querySelector(".active");t&&s(t.textContent,r)}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(845),n(892)})()})();
//# sourceMappingURL=main.js.map