const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let o=null;function n(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;document.body.style.backgroundColor=t}t.addEventListener("click",(function(){t.disabled=!0,o=setInterval(n,666)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(o),document.body.style.backgroundColor=""}));
//# sourceMappingURL=01-color-switcher.67b98394.js.map
