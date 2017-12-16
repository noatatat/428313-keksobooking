'use strict';

(function () {
  var OFFER_TYPE_NAMES = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  function newFeatures(nodeName, advertisement) {
    var featureList = nodeName.querySelector('.popup__features');
    var features = nodeName.querySelectorAll('.popup__features .feature');
    function isFeatureRelevant(feature) {
      return advertisement.offer.features.some(function (relevatFeature) {
        return feature.classList.contains('feature--' + relevatFeature);
      });
    }
    [].forEach.call(features, function (feature) {
      if (!isFeatureRelevant(feature)) {
        featureList.removeChild(feature);
      }
    });
  }

  function createMapCard(advertisement) {
    var mapCard = mapCardTemplate.cloneNode(true);
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
  }

  window.placeMapCard = placeMapCard;
  function placeMapCard(index) {
    removeMapCard();
    var newCard = createMapCard(window.filteredAdvertisements[index]);
    window.mapBlock.insertBefore(newCard, document.querySelector('.map__filters-container'));
  }

  window.removeMapCard = removeMapCard;
  function removeMapCard() {
    var popup = window.mapBlock.querySelector('.popup');
    if (popup) {
      window.mapBlock.removeChild(popup);
    }
  }
})();
