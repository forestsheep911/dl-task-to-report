// ==UserScript==
// @name         用Task填写工数
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.cybozu.cn/*
// @match        https://*.cybozu.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        GM_openInTab
// ==/UserScript==

;(function () {
  // Your code here...
  // GM_openInTab('https://bozuman.cybozu.com/k/',{active:true})
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.src = 'https://localhost:8080/js/app.js'
  document.documentElement.appendChild(script)
})()
