'use strict';

var advertisementsNumber = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerTypeName = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
var offerCheckins = ['12:00', '13:00', '14:00'];
var offerCheckouts = ['12:00', '13:00', '14:00'];
var featureItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinWidth = 40;
var pinHeight = 52;
var maxPrice = 1000;
var minPrice = 10000000;
var maxRooms = 5;
var maxGuests = 50;

function getRandom(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
}

function getRandomInteger(min, max) {
  return Math.floor(getRandom(min, max));
}

function getRandomElement(elements) {
  return elements[getRandomInteger(elements.length)];
}

function createShuffledArray(arrayLength) {
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
}

function createFeatureList() {
  var array = [];
  var size = getRandomInteger(1, featureItems.length + 1);
  var shuffledArray = createShuffledArray(featureItems.length);
  for (var i = 0; i < size; i++) {
    array[i] = featureItems[shuffledArray[i]];
  }
  return array;
}

function createAdvertisement(avatarValue, offerValue, locationX, locationY) {
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarValue + '.png'
    },
    offer: {
      title: offerTitles[offerValue],
      address: locationX + ', ' + locationY,
      price: getRandomInteger(minPrice, maxPrice + 1),
      type: getRandomElement(offerTypes),
      rooms: getRandomInteger(1, maxRooms + 1),
      guests: getRandomInteger(1, maxGuests + 1),
      checkin: getRandomElement(offerCheckins),
      checkout: getRandomElement(offerCheckouts),
      features: createFeatureList(),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

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

function createMapPin(advertisement) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var x = advertisement.location.x - pinWidth / 2;
  var y = advertisement.location.y - pinHeight;
  mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
  mapPin.querySelector('img').src = advertisement.author.avatar;
  return mapPin;
}

var fragmentPins = document.createDocumentFragment();
for (var j = 0; j < advertisementsNumber; j++) {
  fragmentPins.appendChild(createMapPin(advertisements[j]));
}
mapPinsBlock.appendChild(fragmentPins);

function newFeatures(nodeName, advertisement) {
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
}

function createMapCard(advertisement) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = advertisement.offer.title;
  mapCard.querySelector('p small').textContent = advertisement.offer.address;
  mapCard.querySelector('.popup__price').textContent = advertisement.offer.price + '\u20bd/ночь';
  mapCard.querySelector('h4').textContent = offerTypeName[advertisement.offer.type];
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' комнаты для '
    + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin
    + ', выезд до ' + advertisement.offer.checkout;
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
  newFeatures(mapCard, advertisement);
  return mapCard;
}

var fragmentCards = document.createDocumentFragment();
fragmentCards.appendChild(createMapCard(advertisements[0]));
mapBlock.insertBefore(fragmentCards, document.querySelector('.map__filters-container'));

function operateEachInArray(array, flag) {
  for (var ii = 0; ii < array.length - 1; ii++) {
    array[ii].disabled = flag;
  }
}

var formFieldsets = document.querySelectorAll('.notice fieldset');
operateEachInArray(formFieldsets, true);

var mapPinMain = mapBlock.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
mapPinMain.addEventListener('mouseup', function () {
  mapBlock.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  operateEachInArray(formFieldsets, false);
});
