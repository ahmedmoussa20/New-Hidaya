/* Dashboard interactions: live language toggle and local feature search. */
(function(){
 const root=document.getElementById("hidayaDashboard"); if(!root)return;
 const enButton=document.getElementById("hdLanguageToggle"), mini=document.getElementById("hdLangMini"),label=document.getElementById("hdLanguageLabel"),search=document.getElementById("hdFeatureSearch"),menuButton=document.getElementById("hdMenuToggle"),sidebar=document.getElementById("hdSidebar");
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
 function setMenu(open){root.classList.toggle("hd-menu-open",open);if(menuButton){menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu")}document.body.classList.toggle("hd-drawer-open",open)}
 menuButton&&menuButton.addEventListener("click",()=>setMenu(!root.classList.contains("hd-menu-open")));
 root.addEventListener("click",e=>{if(!root.classList.contains("hd-menu-open"))return;const link=e.target.closest(".hd-sidebar a");if(link)setMenu(false);if(e.target===root)setMenu(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
 search&&search.addEventListener("input",function(){const q=this.value.trim().toLowerCase();root.querySelectorAll(".hd-feature-card").forEach(card=>{const hay=(card.textContent+" "+(card.dataset.search||"")).toLowerCase();card.hidden=!!q&&!hay.includes(q)});});
 const searchLabel=root.querySelector(".hd-search");searchLabel&&searchLabel.addEventListener("click",()=>{if(search&&window.matchMedia("(max-width: 760px)").matches)search.focus()});
 root.querySelectorAll(".hd-feature-card.is-coming-soon").forEach(card=>card.addEventListener("click",e=>e.preventDefault()));
 
 // The homepage carousel is managed by the reference-matched inline controller in index.html.
 applyLang();
 window.dispatchEvent(new Event("hidayaLanguageChanged"));
})();
