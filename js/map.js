'use strict';

(function () {
  window.PIN_WIDTH = 40;
  window.PIN_HEIGHT = 52;
  var pinArea = {
    minX: 300,
    maxX: 900,
    minY: 100,
    maxY: 500
  };

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
    window.showPins();
    window.noticeForm.classList.remove('notice__form--disabled');
    disableEachInArray(formFieldsets, false);
    addDrugFeature();
    mapPinMain.removeEventListener('mouseup', activateMap);
  }

  mapPinMain.addEventListener('mousedown', function () {
    window.removeMapCard();
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  });

  function addDrugFeature() {
    mapPinMain.draggable = true;
    mapPinMain.addEventListener('dragstart', onMainPinDragStart);
  }

  var shift = {};
  function onMainPinDragStart(evt) {
    shift = {
      x: evt.clientX - mapPinMain.offsetLeft,
      y: evt.clientY - mapPinMain.offsetTop
    };
    mapPinMain.addEventListener('dragend', onMainPinDragEnd);
  }

  function onMainPinDragEnd(endEvt) {
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
    mapPinMain.removeEventListener('dragend', onMainPinDragEnd);
  }

  function pinCoordsControl(object) {
    var minCoordY = pinArea.minY - window.PIN_HEIGHT;
    var maxCoordY = pinArea.maxY - window.PIN_HEIGHT;
    var minCoordX = pinArea.minX - window.PIN_WIDTH / 2;
    var maxCoordX = pinArea.maxX - window.PIN_WIDTH / 2;
    object.x = window.utils.minMax(object.x, minCoordX, maxCoordX);
    object.y = window.utils.minMax(object.y, minCoordY, maxCoordY);
  }
})();
