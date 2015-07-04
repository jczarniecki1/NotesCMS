setTimeout(function() {
  var _leftoversScript;
  _leftoversScript = document.createElement('script');
  _leftoversScript.setAttribute('src', '/dest/app/utils/loadLeftovers.js');
  _leftoversScript.setAttribute('async', '');
  return document.body.appendChild(_leftoversScript);
}, parseInt(localStorage.leftoversTimeout || "500"));

localStorage.leftoversTimeout = "0";
