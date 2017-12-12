'use strict';

(function () {
  var mapPinsBlock = document.querySelector('.map__pins');
  window.mapBlock = document.querySelector('.map');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  function createPins(data) {
    window.advertisements = data;

    var createMapPin = function (advertisement) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var x = advertisement.location.x - window.PIN_WIDTH / 2;
      var y = advertisement.location.y - window.PIN_HEIGHT;
      mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
      mapPin.querySelector('img').src = advertisement.author.avatar;
      return mapPin;
    };

    window.fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < window.ADVERTICEMENT_NUMBER; i++) {
      window.fragmentPins.appendChild(createMapPin(window.advertisements[i]));
    }
  }

  window.backend.load(createPins, window.utils.showErrorMessage);

  window.showPins = showPins;
  function showPins() {
    mapPinsBlock.appendChild(window.fragmentPins);
    var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.addEventListener('click', function (evt) {
        window.showCard(evt, pins);
      });
    });
  }
})();
