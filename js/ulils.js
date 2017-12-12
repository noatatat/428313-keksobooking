'use strict';

(function () {
  window.KEYCODE = {
    ESCAPE: 27
  };
  window.utils = {
    getRandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(window.utils.getRandom(min, max));
    },

    getRandomElement: function (elements) {
      return elements[window.utils.getRandomInteger(elements.length)];
    },

    createShuffledArray: function (arrayLength) {
      var temporaryValue;
      var randomIndex;
      var array = [];

      for (var i = 0; i < arrayLength; i++) {
        array.push(i);
      }
      var currentIndex = array.length - 1;

      while (currentIndex !== 0) {
        randomIndex = window.utils.getRandomInteger(currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    minMax: function (value, min, max) {
      return Math.max(min, Math.min(value, max));
    },

    getOptionValue: function (selectName, optionIndex) {
      return selectName.options[optionIndex].value;
    },

    hideOptionsAll: function (selectName) {
      [].forEach.call(selectName, function (option) {
        option.hidden = true;
      });
    },

    hiddenOptionOff: function (selectName, optionIndex) {
      selectName.options[optionIndex].hidden = false;
    },

    hideAllOptionsExept: function (selectName, indexExept) {
      window.utils.hideOptionsAll(selectName);
      window.utils.hiddenOptionOff(selectName, indexExept);
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
