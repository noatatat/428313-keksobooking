'use strict';

(function () {
  var OFFER_TYPE_NAMES = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var newFeatures = function (nodeName, advertisement) {
    var featureList = nodeName.querySelector('.popup__features');
    var features = nodeName.querySelectorAll('.popup__features .feature');
    for (var k = 0; k < features.length; k++) {
      if (advertisement.offer.features[k]) {
        features[k].classList = 'feature feature--' + advertisement.offer.features[k];
      } else {
        featureList.removeChild(features[k]);
      }
    }
    return nodeName;
  };

  var createMapCard = function (advertisement) {
    var mapCard = mapCardTemplate.cloneNode(true);
    mapCard.classList.add('hidden');
    mapCard.querySelector('h3').textContent = advertisement.offer.title;
    mapCard.querySelector('p small').textContent = advertisement.offer.address;
    mapCard.querySelector('.popup__price').textContent = advertisement.offer.price + '\u20bd/ночь';
    mapCard.querySelector('h4').textContent = OFFER_TYPE_NAMES[advertisement.offer.type];
    mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
    mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
    newFeatures(mapCard, advertisement);
    return mapCard;
  };

  var fragmentCards = document.createDocumentFragment();
  for (var h = 0; h < window.ADVERTICEMENT_NUMBER; h++) {
    fragmentCards.appendChild(createMapCard(window.advertisements[h]));
  }
  window.mapBlock.insertBefore(fragmentCards, document.querySelector('.map__filters-container'));
})();
