'use strict';

(function () {
  var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin) {
    pin.addEventListener('click', function (evt) {
      window.showCard(evt, pins);
    });
  });
})();
