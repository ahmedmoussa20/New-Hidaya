/* Hidaya shared navigation helpers. Deliberately leaves feature/audio logic untouched. */
(function(){
  "use strict";
  function sameOriginReferrer(){
    try{return !!document.referrer && new URL(document.referrer).origin===location.origin;}
    catch(_){return false;}
  }
  document.addEventListener("click",function(event){
    const control=event.target && event.target.closest
      ? event.target.closest("a.back,button.back,[data-hidaya-back],#backBtn")
      : null;
    if(!control)return;
    // Respect controls explicitly marked as non-navigation.
    if(control.hasAttribute("data-hidaya-no-back"))return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const fallback=control.getAttribute("data-fallback") || control.getAttribute("href") || "index.html";
    if(sameOriginReferrer() && history.length>1){
      history.back();
    }else{
      location.href=fallback;
    }
  },true);
})();