'use strict';

(function () {
  function disableEachInArray(array, flag) {
    array.forEach(function (element) {
      element.disabled = flag;
    });
  }

  var formFieldsets = document.querySelectorAll('.notice fieldset');
  disableEachInArray(formFieldsets, true);

  var mapPinMain = window.mapBlock.querySelector('.map__pin--main');
  window.noticeForm = document.querySelector('.notice__form');

  mapPinMain.addEventListener('click', activateMap);
  function activateMap() {
    window.mapBlock.classList.remove('map--faded');
    window.noticeForm.classList.remove('notice__form--disabled');
    disableEachInArray(formFieldsets, false);
    addDrugFeature();
    mapPinMain.removeEventListener('mouseup', activateMap);
  }

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
    var minCoordY = window.pinArea.minY - window.PIN_HEIGHT;
    var maxCoordY = window.pinArea.maxY - window.PIN_HEIGHT;
    var minCoordX = window.pinArea.minX - window.PIN_WIDTH / 2;
    var maxCoordX = window.pinArea.maxX - window.PIN_WIDTH / 2;

    object.x = window.utils.minMax(object.x, minCoordX, maxCoordX);
    object.y = window.utils.minMax(object.y, minCoordY, maxCoordY);

/*    function minMax(coordValue, min, max) {
      return Math.max(min, Math.min(coordValue, max));
    }*/
  }
})();
