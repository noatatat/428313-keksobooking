'use strict';

(function () {
  var clickedElement = null;
  var value = 0;

  window.showCard = showCard;
  function showCard(evt, pins) {
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

  function openPopup(index) {
    window.placeMapCard(index);

    var closePopup = window.mapBlock.querySelector('.popup__close');
    closePopup.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(escEvt) {
    if (escEvt.keyCode === window.KEYCODE.ESCAPE) {
      onPopupClose();
    }
  }

  function onPopupClose() {
    window.removeMapCard();
    clickedElement.classList.remove('map__pin--active');
  }
})();
