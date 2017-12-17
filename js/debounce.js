'use strict';

(function () {
  window.debounce = debounce;
  function debounce(doThis, timeout) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      doThis();
    }, timeout);
  }
})();
