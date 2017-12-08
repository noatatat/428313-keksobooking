'use strict';

(function () {
  window.KEYCODE = {
    ESCAPE: 27
  };
  window.ADVERTICEMENT_NUMBER = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  window.OFFER_TYPE_MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};
  var OFFER_CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
  var FEATURE_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var createFeatureList = function () {
    var array = [];
    var size = window.utils.getRandomInteger(1, FEATURE_ITEMS.length);
    var shuffledArray = window.utils.createShuffledArray(FEATURE_ITEMS.length);
    for (var i = 0; i < size; i++) {
      array[i] = FEATURE_ITEMS[shuffledArray[i]];
    }
    return array;
  };

  var createAdvertisement = function (avatarValue, offerValue, locationX, locationY) {
    return {
      author: {
        avatar: 'img/avatars/user0' + avatarValue + '.png'
      },
      offer: {
        title: OFFER_TITLES[offerValue],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomInteger(1000, 10000000),
        type: window.utils.getRandomElement(OFFER_TYPES),
        rooms: window.utils.getRandomInteger(1, 5),
        guests: window.utils.getRandomInteger(1, 50),
        checkin: window.utils.getRandomElement(OFFER_CHECKIN_OPTIONS),
        checkout: window.utils.getRandomElement(OFFER_CHECKOUT_OPTIONS),
        features: createFeatureList(),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  window.advertisements = [];
  var avatarValues = window.utils.createShuffledArray(window.ADVERTICEMENT_NUMBER);
  var offerValues = window.utils.createShuffledArray(OFFER_TITLES.length);
  for (var i = 0; i < window.ADVERTICEMENT_NUMBER; i++) {
    var locationX = window.utils.getRandomInteger(300, 900);
    var locationY = window.utils.getRandomInteger(100, 500);
    window.advertisements[i] = createAdvertisement(avatarValues[i] + 1, offerValues[i], locationX, locationY);
  }
})();
