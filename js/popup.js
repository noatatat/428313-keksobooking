'use strict';

(function () {
  var clickedElement = null;
  var activePopup = null;
  var value = 0;

  function openPopup(index) {
    if (activePopup) {
      activePopup.classList.add('hidden');
    }
    activePopup = popups[index];
    activePopup.classList.remove('hidden');

    var closePopup = activePopup.querySelector('.popup__close');
    closePopup.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.KEYCODE.ESCAPE) {
      onPopupClose();
    }
  }

  function onPopupClose() {
    activePopup.classList.add('hidden');
    clickedElement.classList.remove('map__pin--active');
  }

  function onPinClick(evt) {
    var current = evt.currentTarget;
    value = [].findIndex.call(pins, function (element) {
      return element === current;
    });
    openPopup(value);
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
    clickedElement = current;
    clickedElement.classList.add('map__pin--active');
  }

  var pins = window.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
  var popups = window.mapBlock.querySelectorAll('.popup');
  pins.forEach(function (pin) {
    pin.addEventListener('click', onPinClick);
  });
})();
