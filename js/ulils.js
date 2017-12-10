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
    }
  };
})();
