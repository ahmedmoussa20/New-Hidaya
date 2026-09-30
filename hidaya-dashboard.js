/* Dashboard interactions: live language toggle and local feature search. */
(function(){
 const root=document.getElementById("hidayaDashboard"); if(!root)return;
 const enButton=document.getElementById("hdLanguageToggle"), mini=document.getElementById("hdLangMini"),label=document.getElementById("hdLanguageLabel"),search=document.getElementById("hdFeatureSearch");
 const searchToggle=document.getElementById("hdSearchToggle");
 const menuToggle=document.getElementById("hdMenuToggle"),mobileMenu=document.getElementById("hdMobileShowcaseMenu");
 function lang(){return localStorage.getItem("hidayaLang")||"ar"}
 function applyLang(){
   const ar=lang()==="ar";
   document.documentElement.lang=ar?"ar":"en";document.documentElement.dir=ar?"rtl":"ltr";document.body.classList.toggle("rtl",ar);
   root.querySelectorAll("[data-hd-en][data-hd-ar]").forEach(el=>{el.textContent=ar?el.dataset.hdAr:el.dataset.hdEn});
   if(label)label.textContent=ar?"AR":"EN";
   if(search)search.placeholder=ar?(search.dataset.hdPlaceholderAr||"ابحث في هداية..."):(search.dataset.hdPlaceholderEn||"Search Hidaya...");
   root.querySelectorAll(".hd-side-links a,.hd-bottom-nav a").forEach(a=>a.classList.toggle("is-active",a.getAttribute("href")==="#hidayaDashboard"));
 }
 function toggleLang(){const next=lang()==="ar"?"en":"ar";localStorage.setItem("hidayaLang",next);document.documentElement.lang=next;document.documentElement.dir=next==="ar"?"rtl":"ltr";document.body.classList.toggle("rtl",next==="ar");applyLang();window.dispatchEvent(new Event("hidayaLanguageChanged"))}
 enButton&&enButton.addEventListener("click",toggleLang);mini&&mini.addEventListener("click",toggleLang);
 searchToggle&&searchToggle.addEventListener("click",function(){if(!search)return;search.parentElement.classList.toggle("is-open");if(search.parentElement.classList.contains("is-open"))search.focus();else search.value="";});
 menuToggle&&menuToggle.addEventListener("click",function(){const open=mobileMenu.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰";});
 mobileMenu&&mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mobileMenu.classList.remove("is-open");menuToggle&&menuToggle.setAttribute("aria-expanded","false");}));
 search&&search.addEventListener("input",function(){const q=this.value.trim().toLowerCase();root.querySelectorAll(".hd-feature-card").forEach(card=>{const hay=(card.textContent+" "+(card.dataset.search||"")).toLowerCase();card.hidden=!!q&&!hay.includes(q)});});
 applyLang();
 window.dispatchEvent(new Event("hidayaLanguageChanged"));
})();
