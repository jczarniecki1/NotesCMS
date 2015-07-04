
/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
 */
var cb, j, k, len, len1, ref1, ref2, url, waitFor;

window.loadCSS = function(href, before, media, callback) {
  'use strict';
  var ref, sheets, ss;
  ss = window.document.createElement('link');
  ref = before || window.document.getElementsByTagName('script')[0];
  sheets = window.document.styleSheets;
  ss.rel = 'stylesheet';
  ss.href = href;
  ss.media = 'only x';
  if (callback) {
    ss.onload = callback;
  }
  ref.parentNode.insertBefore(ss, ref);
  ss.onloadcssdefined = function(cb) {
    var defined, i;
    defined = void 0;
    i = 0;
    while (i < sheets.length) {
      if (sheets[i].href && sheets[i].href === ss.href) {
        defined = true;
      }
      i++;
    }
    if (defined) {
      return cb();
    } else {
      return setTimeout(function() {
        return ss.onloadcssdefined(cb);
      });
    }
  };
  ss.onloadcssdefined(function() {
    return ss.media = media || 'all';
  });
  return ss;
};

if (Leftovers.stylesheets != null) {
  ref1 = Leftovers.stylesheets;
  for (j = 0, len = ref1.length; j < len; j++) {
    url = ref1[j];
    loadCSS(url);
  }
}

waitFor = function(name, callback, initialDelay) {
  var check, delay;
  if (initialDelay == null) {
    initialDelay = 50;
  }
  delay = initialDelay;
  return (check = function() {
    setTimeout(function() {
      if (window[name]) {
        return callback();
      } else {
        return check();
      }
    }, delay);
    return delay = (delay * 2) % 2000;
  })();
};

if (Leftovers.callbacks != null) {
  ref2 = Leftovers.callbacks;
  for (k = 0, len1 = ref2.length; k < len1; k++) {
    cb = ref2[k];
    waitFor(cb.require, cb.run, cb.delay);
  }
}
