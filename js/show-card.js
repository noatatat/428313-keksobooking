'use strict';

(function () {
  var clickedElement = null;
  var activePopup = null;
  var value = 0;

  window.showCard = showCard;
  function showCard(evt, pins, popups) {
    var current = evt.currentTarget;
    value = [].findIndex.call(pins, function (element) {
      return element === current;
    });
    openPopup(value, popups);
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
    clickedElement = current;
    clickedElement.classList.add('map__pin--active');
  }

  function openPopup(index, popups) {
    if (activePopup) {
      activePopup.classList.add('hidden');
    }
    activePopup = popups[index];
    activePopup.classList.remove('hidden');

    var closePopup = activePopup.querySelector('.popup__close');
    closePopup.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(escEvt) {
    if (escEvt.keyCode === window.KEYCODE.ESCAPE) {
      onPopupClose();
    }
  }

  function onPopupClose() {
    activePopup.classList.add('hidden');
    clickedElement.classList.remove('map__pin--active');
  }
})();
