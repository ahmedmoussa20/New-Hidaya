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
})();