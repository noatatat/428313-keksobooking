'use strict';

(function () {
  var mapPinsBlock = document.querySelector('.map__pins');
  window.mapBlock = document.querySelector('.map');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var createMapPin = function (advertisement) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var x = advertisement.location.x - window.PIN_WIDTH / 2;
    var y = advertisement.location.y - window.PIN_HEIGHT;
    mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    mapPin.querySelector('img').src = advertisement.author.avatar;
    return mapPin;
  };

  var fragmentPins = document.createDocumentFragment();
  for (var j = 0; j < window.ADVERTICEMENT_NUMBER; j++) {
    fragmentPins.appendChild(createMapPin(window.advertisements[j]));
  }

  window.showPins = showPins;
  function showPins() {
    mapPinsBlock.appendChild(fragmentPins);
    var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.addEventListener('click', function (evt) {
        window.showCard(evt, pins);
      });
    });
  }
})();
