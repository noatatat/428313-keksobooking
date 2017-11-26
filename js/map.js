'use strict';

var advertisementsNumber = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerTypeName = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerCheckout = ['12:00', '13:00', '14:00'];
var featureItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinWidth = 40;
var pinHeight = 52;

var getRandomInteger = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var createShuffledArray = function (arrayLength) {
  var temporaryValue;
  var randomIndex;
  var array = [];

  for (var i = 0; i < arrayLength; i++) {
    array.push(i);
  }
  var currentIndex = array.length - 1;

  while (currentIndex !== 0) {
    randomIndex = getRandomInteger(currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var createFeatureList = function () {
  var array = [];
  var size = getRandomInteger(1, featureItems.length);
  var shuffledArray = createShuffledArray(featureItems.length);
  for (var i = 0; i < size; i++) {
    array[i] = featureItems[shuffledArray[i]];
  }
  return array;
};

var createAdvertisement = function (avatarValue, offerValue, locationX, locationY) {
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + avatarValue + '.png'
    },
    offer: {
      title: offerTitles[offerValue],
      address: locationX + ', ' + locationY,
      price: getRandomInteger(1000, 10000000),
      type: offerTypes[getRandomInteger(offerTypes.length - 1)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 50),
      checkin: offerCheckin[getRandomInteger(offerCheckin.length - 1)],
      checkout: offerCheckout[getRandomInteger(offerCheckout.length - 1)],
      features: createFeatureList(),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advertisement;
};

var advertisements = [];
var avatarValues = createShuffledArray(advertisementsNumber);
var offerValues = createShuffledArray(offerTitles.length);
for (var i = 0; i < advertisementsNumber; i++) {
  var locationX = getRandomInteger(300, 900);
  var locationY = getRandomInteger(100, 500);
  advertisements[i] = createAdvertisement(avatarValues[i] + 1, offerValues[i], locationX, locationY);
}

var mapPinsBlock = document.querySelector('.map__pins');
var mapBlock = document.querySelector('.map');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var createMapPin = function (advertisement) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var x = advertisement.location.x - pinWidth / 2;
  var y = advertisement.location.y + pinHeight;
  mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
  mapPin.querySelector('img').src = advertisement.author.avatar;
  return mapPin;
};

var fragmentPins = document.createDocumentFragment();
for (var j = 0; j < advertisementsNumber; j++) {
  fragmentPins.appendChild(createMapPin(advertisements[j]));
}
mapPinsBlock.appendChild(fragmentPins);

var newFeatures = function (nodeName, advertisement) {
  var featureList = nodeName.querySelector('.popup__features');
  var features = nodeName.querySelectorAll('.popup__features .feature');
  for (var ii = 1; ii < features.length; ii++) {
    featureList.removeChild(features[ii]);
  }
  featureList = nodeName.querySelector('.popup__features');
  var feature = nodeName.querySelector('.popup__features .feature');
  var advertisementValueList = advertisement.offer.features;
  feature.classList = 'feature feature--' + advertisementValueList[0];
  for (var jj = 1; jj < advertisementValueList.length; jj++) {
    featureList.appendChild(feature.cloneNode(true));
    feature.classList = 'feature feature--' + advertisementValueList[jj];
  }
  return nodeName;
};

var createMapCard = function (advertisement) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = advertisement.offer.title;
  mapCard.querySelector('p small').textContent = advertisement.offer.address;
  mapCard.querySelector('.popup__price').textContent = advertisement.offer.price + '\u20bd/ночь';
  mapCard.querySelector('h4').textContent = offerTypeName[advertisement.offer.type];
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
  newFeatures(mapCard, advertisement);
  return mapCard;
};

var fragmentCards = document.createDocumentFragment();
fragmentCards.appendChild(createMapCard(advertisements[0]));
mapBlock.insertBefore(fragmentCards, document.querySelector('.map__filters-container'));

document.querySelector('.map').classList.remove('map--faded');
