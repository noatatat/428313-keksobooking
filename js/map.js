'use strict';

var ESC_KEYCODE = 27;

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
  var y = advertisement.location.y - pinHeight;
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
  mapCard.querySelector('h4').textContent = offerTypeName[advertisement.offer.type];
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
  newFeatures(mapCard, advertisement);
  return mapCard;
};

var fragmentCards = document.createDocumentFragment();
for (var h = 0; h < advertisementsNumber; h++) {
  fragmentCards.appendChild(createMapCard(advertisements[h]));
}
mapBlock.insertBefore(fragmentCards, document.querySelector('.map__filters-container'));

function disableEachInArray(array, flag) {
  for (var ii = 0; ii < array.length - 1; ii++) {
    array[ii].disabled = flag;
  }
}

var formFieldsets = document.querySelectorAll('.notice fieldset');
disableEachInArray(formFieldsets, true);

var mapPinMain = mapBlock.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
mapPinMain.addEventListener('mouseup', function () {
  mapBlock.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  disableEachInArray(formFieldsets, false);
});

var clickedElement = null;
var activePopup = null;
var value = 0;

function openPopup(i1) {
  if (activePopup) {
    activePopup.classList.add('hidden');
  }
  activePopup = popups[i1];
  activePopup.classList.remove('hidden');

  var closePopup = activePopup.querySelector('.popup__close');
  closePopup.addEventListener('click', onPopupClose);

  document.addEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPopupClose();
  }
}

function onPopupClose() {
  activePopup.classList.add('hidden');
  clickedElement.classList.remove('map__pin--active');
}

function onPinClick(evt) {
  if (clickedElement) {
    clickedElement.classList.remove('map__pin--active');
  }

  clickedElement = evt.currentTarget;
  clickedElement.classList.add('map__pin--active');
  for (var i2 = 0; i2 < pins.length; i2++) {
    if (evt.currentTarget === pins[i2]) {
      value = i2;
    }
  }
  openPopup(value);
}

var pins = mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
var popups = mapBlock.querySelectorAll('.popup');
for (var jj = 0; jj < pins.length; jj++) {
  pins[jj].addEventListener('click', onPinClick);
}
