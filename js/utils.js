'use strict';

(function () {
  window.KEYCODE = {
    ESCAPE: 27
  };
  window.utils = {
    minMax: function (value, min, max) {
      return Math.max(min, Math.min(value, max));
    },

    getOptionValue: function (selectName, optionIndex) {
      return selectName.options[optionIndex].value;
    },

    getSelectedValue: function (selectName) {
      var selectedIndex = selectName.options.selectedIndex;
      return selectName.options[selectedIndex].value;
    },

    hideOptionsAll: function (selectName) {
      [].forEach.call(selectName, function (option) {
        option.hidden = true;
      });
    },

    showHiddenOption: function (selectName, optionIndex) {
      selectName.options[optionIndex].hidden = false;
    },

    hideAllOptionsExept: function (selectName, indexExept) {
      window.utils.hideOptionsAll(selectName);
      window.utils.showHiddenOption(selectName, indexExept);
      selectName.options.selectedIndex = indexExept;
    },

    debounce: function (doThis, timeout) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        doThis();
      }, timeout);
    },

    showErrorMessage: function (errorMessage) {
      var fragment = document.createDocumentFragment();
      var main = document.querySelector('main');
      var div = document.createElement('div');
      div.classList = 'error-message';
      div.style = 'z-index: 4; ' +
        'position:fixed; ' +
        'top: 120px; ' +
        'left: 50%; ' +
        'transform: translateX(-50%); ' +
        'padding: 20px 30px; ' +
        'border-radius: 5px; ' +
        'border: 3px solid white; ' +
        'background-color: rgba(255, 0, 0, 0.6); ' +
        'box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0.4); ' +
        'font-weight: bold; ' +
        'color: #FFFFFF; ' +
        'text-align: center';
      div.textContent = errorMessage;
      fragment.appendChild(div);
      main.appendChild(fragment);
      setTimeout(function () {
        main.removeChild(main.querySelector('.error-message'));
      }, 5000);
    }
  };
})();
