/* Shared navigation helper. Only controls explicitly marked for shared back behavior are intercepted. */
(function(){
  "use strict";
  function sameOriginReferrer(){
    try{return !!document.referrer && new URL(document.referrer).origin===location.origin;}
    catch(_){return false;}
  }
  document.addEventListener("click",function(event){
    const control=event.target && event.target.closest ? event.target.closest("[data-hidaya-back]") : null;
    if(!control || control.hasAttribute("data-hidaya-no-back"))return;
    event.preventDefault();
    const fallback=control.getAttribute("data-fallback") || "index.html";
    if(sameOriginReferrer() && history.length>1) history.back();
    else location.href=fallback;
  });

  /* Lightweight bilingual support for Arabic-first pages that previously had no language switch. */
  const pageCopy = {
    "رحلتك مع القرآن":"Your journey with the Quran",
    "NEARBY MOSQUES":"Nearby Mosques",
    "المساجد القريبة منك":"Nearby Mosques",
    "اعثر على أقرب مسجد إليك، وتصفّح المساجد مرتبة حسب المسافة، ثم افتح موقع المسجد مباشرةً على Google Maps.":"Find nearby mosques, browse them by distance, and open any location directly in Google Maps.",
    "موقعك الحالي":"Your current location",
    "نحتاج إلى إذن الموقع لعرض المساجد الأقرب إليك.":"Allow location access to find the nearest mosques.",
    "تحديد موقعي":"Use my location",
    "الأقرب أولًا":"Nearest first",
    "الاسم أبجديًا":"Name (A–Z)",
    "نطاق 5 كم":"Within 5 km",
    "نطاق 10 كم":"Within 10 km",
    "نطاق 20 كم":"Within 20 km",
    "تحديث الموقع":"Refresh location",
    "المساجد القريبة":"Nearby mosques",
    "جارٍ البحث...":"Searching…",
    "ابدأ بتحديد موقعك":"Start by sharing your location",
    "اعثر على المساجد":"Find mosques",
    "حاول مرة أخرى":"Try again",
    "لا توجد نتائج مطابقة":"No matching results",
    "لم نعثر على مساجد في النطاق القريب":"No mosques found nearby",
    "مسح البحث":"Clear search",
    "إعادة المحاولة":"Try again",
    "الموقع على الخريطة":"View on map",
    "من موقعك":"from your location",
    "جارٍ العثور على المساجد القريبة":"Finding nearby mosques",
    "نحدد موقعك ونبحث عن المساجد حولك. قد يستغرق ذلك بضع ثوانٍ.":"We’re locating you and searching nearby. This may take a few seconds.",
    "HIDAYA · LEARN & RECITE":"HIDAYA · LEARN & RECITE",
    "القرآن التفاعلي":"Interactive Quran",
    "اقرأ من حفظك، واستمع إلى تلاوتك وراجع الكلمات التي تحتاج إلى مراجعة.":"Recite from memory, listen to your recitation, and review words that need practice.",
    "اختر السورة":"Choose a surah",
    "سورة واحدة متاحة حاليًا":"One surah is currently available",
    "الكل":"All",
    "متاحة":"Available",
    "مقفولة":"Coming soon",
    "لا توجد سورة مطابقة لبحثك.":"No surahs match your search.",
    "ابدأ بسورة الفاتحة، وسيتم إتاحة باقي السور تدريجيًا.":"Start with Al-Fatihah. More surahs will be added over time.",
    "HIDAYA · RECITATION PRACTICE":"HIDAYA · RECITATION PRACTICE",
    "اقرأ الآية من حفظك، ثم راجع نتيجة التعرّف على الكلمات.":"Recite the verse from memory, then review the word-recognition results.",
    "سورة رقم ١ · ٧ آيات":"Surah 1 · 7 verses",
    "سورة الفاتحة":"Surah Al-Fatihah",
    "اختر الآية":"Choose a verse",
    "الآية 1 من 7":"Verse 1 of 7",
    "النص مخفي — جرّب القراءة من حفظك":"Text hidden — try reciting from memory",
    "◉ إخفاء الآية":"◉ Hide verse",
    "▶ استمع للآية":"▶ Listen to verse",
    "مراجعة الكلمات":"Review words",
    "أدوات التسميع":"Recitation tools",
    "اضغط لبدء التلاوة":"Tap to start reciting",
    "إعادة المحاولة ↻":"Try again ↻",
    "الآية التالية ←":"Next verse ←",
    "اقرأ الآية من حفظك، ثم اضغط زر الميكروفون لمراجعة الكلمات.":"Recite the verse from memory, then tap the microphone to review the words.",
    "المراجعة الصوتية أولية وقد تتأثر بجودة الصوت والمتصفح.":"Voice review is an early feature and may vary with your microphone and browser.",
    "افتح رحلتك مع القرآن":"Begin your Quran journey",
    "سورة الفاتحة متاحة الآن في القرآن التفاعلي. سيتم فتح باقي السور في التحديثات القادمة.":"Surah Al-Fatihah is available now. More surahs will be added in future updates.",
    "حمّل الآن من":"Get Hidaya on",
    "متاح على":"Available on",
    "بصوت القراء":"Beautiful recitations",
    "آية بآية":"Verse by verse",
    "خطوة بخطوة":"Step by step",
    "قريبًا":"Coming soon",
    "✧ ابدأ رحلتك مع القرآن مع هداية ✧":"✧ Start your Quran journey with Hidaya ✧",
    "العودة للرئيسية":"Back to home",
    "العودة إلى الرئيسية":"Back to home",
    "رجوع":"Back"
  };
  const pageCopyReverse = Object.fromEntries(Object.entries(pageCopy).map(([ar,en])=>[en,ar]));
  function applyPageLanguage(){
    const ar = (localStorage.getItem("hidayaLang") || "ar") === "ar";
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    const toggle = document.getElementById("hidayaPageLangToggle");
    if(toggle){toggle.textContent = ar ? "English" : "العربية";toggle.setAttribute("aria-label",ar?"Switch to English":"التبديل إلى العربية")}
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const raw=node.nodeValue, trimmed=raw.trim();
      if(!trimmed) continue;
      const translated=ar ? pageCopyReverse[trimmed] : pageCopy[trimmed];
      if(translated && translated !== trimmed) node.nodeValue=raw.replace(trimmed,translated);
    }
    document.querySelectorAll("input[placeholder], [aria-label], [title]").forEach(el=>{
      ["placeholder","aria-label","title"].forEach(attr=>{
        const value=el.getAttribute(attr); if(!value)return;
        const translated=ar?pageCopyReverse[value]:pageCopy[value];
        if(translated)el.setAttribute(attr,translated);
      });
    });
  }
  const pageToggle=document.getElementById("hidayaPageLangToggle");
  if(pageToggle) pageToggle.addEventListener("click",()=>{localStorage.setItem("hidayaLang",(localStorage.getItem("hidayaLang")||"ar")==="ar"?"en":"ar");applyPageLanguage()});
  window.addEventListener("hidayaLanguageChanged",applyPageLanguage);
  if(pageToggle){applyPageLanguage();const pageObserver=new MutationObserver(()=>applyPageLanguage());pageObserver.observe(document.body,{childList:true,subtree:true,characterData:true});}

})();
