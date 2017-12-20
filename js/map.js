'use strict';

(function () {
  window.PIN_WIDTH = 0;
  window.PIN_HEIGHT = 15;
  var PIN_AREA = {
    X: {MIN: 50, MAX: 1150},
    Y: {MIN: 100, MAX: 500}
  };

  window.backend.load(function (data) {
    window.advertisements = data;
  }, window.utils.showErrorMessage);

  function disableEachInArray(array, flag) {
    array.forEach(function (element) {
      element.disabled = flag;
    });
  }

  var formFieldsets = document.querySelectorAll('.notice fieldset');
  disableEachInArray(formFieldsets, true);

  var mapPinMain = window.mapBlock.querySelector('.map__pin--main');
  window.noticeForm = document.querySelector('.notice__form');

  mapPinMain.addEventListener('mouseup', activateMap);
  function activateMap() {
    window.mapBlock.classList.remove('map--faded');
    window.showPins(window.advertisements);
    window.noticeForm.classList.remove('notice__form--disabled');
    disableEachInArray(formFieldsets, false);
    window.filterPins();
    mapPinMain.removeEventListener('mouseup', activateMap);
  }
  var shift = {};
  mapPinMain.addEventListener('mousedown', function (evt) {
    window.removeMapCard();
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    shift = {
      x: evt.clientX - mapPinMain.offsetLeft,
      y: evt.clientY - mapPinMain.offsetTop
    };
    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });

  function onMainPinMouseMove(endEvt) {
    var coords = {
      x: endEvt.clientX - shift.x,
      y: endEvt.clientY - shift.y
    };

    pinCoordsControl(coords);
    mapPinMain.style.left = coords.x + 'px';
    mapPinMain.style.top = coords.y + 'px';

    window.pinCoords = {
      x: coords.x + window.PIN_WIDTH / 2,
      y: coords.y + window.PIN_HEIGHT
    };

    window.adressInput.value = 'x: ' + window.pinCoords.x + ', y: ' + window.pinCoords.y;
  }

  function onMainPinMouseUp() {
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  }

  function pinCoordsControl(object) {
    var minCoordY = PIN_AREA.Y.MIN - window.PIN_HEIGHT;
    var maxCoordY = PIN_AREA.Y.MAX - window.PIN_HEIGHT;
    var minCoordX = PIN_AREA.X.MIN - window.PIN_WIDTH / 2;
    var maxCoordX = PIN_AREA.X.MAX - window.PIN_WIDTH / 2;
    object.x = window.utils.minMax(object.x, minCoordX, maxCoordX);
    object.y = window.utils.minMax(object.y, minCoordY, maxCoordY);
  }
})();
