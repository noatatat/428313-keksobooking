'use strict';

(function () {
  var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
  var popups = window.mapBlock.querySelectorAll('.popup');
  pins.forEach(function (pin) {
    pin.addEventListener('click', function (evt) {
      window.showCard(evt, pins, popups);
    });
  });
})();
