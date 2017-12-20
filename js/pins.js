'use strict';

(function () {
  var MAX_PINS_ON_MAP = 5;
  var mapPinsBlock = document.querySelector('.map__pins');
  window.mapBlock = document.querySelector('.map');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  function createMapPin(advertisement) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var x = advertisement.location.x - window.PIN_WIDTH / 2;
    var y = advertisement.location.y - window.PIN_HEIGHT;
    mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    mapPin.querySelector('img').src = advertisement.author.avatar;
    return mapPin;
  }

  function setElementNumberLessMax(elements, max) {
    return (elements.length < max)
      ? elements.length
      : max;
  }

  function createPinFragment(advertisements) {
    var fragmentPins = document.createDocumentFragment();
    var pinsOnMap = setElementNumberLessMax(advertisements, MAX_PINS_ON_MAP);
    advertisements.slice(0, pinsOnMap).forEach(function (advertisement) {
      fragmentPins.appendChild(createMapPin(advertisement));
    });
    return fragmentPins;
  }

  window.showPins = showPins;
  function showPins(advertisements) {
    removePins();
    mapPinsBlock.appendChild(createPinFragment(advertisements));
    var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(pins, function (pin) {
      pin.addEventListener('click', function (evt) {
        window.showCard(evt, pins);
      });
    });
  }

  function removePins() {
    var pins = mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      [].forEach.call(pins, function (node) {
        mapPinsBlock.removeChild(node);
      });
    }
  }
})();
