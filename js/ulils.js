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

    showErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
