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
    mapPinMain.style.left = coords.x + 'px';
    mapPinMain.style.top = coords.y + 'px';
    mapPinMain.removeEventListener('dragend', onMainPinDragEnd);
  }
})();
