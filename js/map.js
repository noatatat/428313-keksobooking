'use strict';

var ESC_KEYCODE = 27;
var ADVERTICEMENT_NUMBER = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TYPE_NAMES = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};
var OFFER_CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
var FEATURE_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 52;

(function () {
  window.random = {
    getRandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(window.random.getRandom(min, max));
    },

    getRandomElement: function (elements) {
      return elements[window.random.getRandomInteger(elements.length)];
    },

    createShuffledArray: function (arrayLength) {
      var temporaryValue;
      var randomIndex;
      var array = [];

      for (var i = 0; i < arrayLength; i++) {
        array.push(i);
      }
      var currentIndex = array.length - 1;

      while (currentIndex !== 0) {
        randomIndex = window.random.getRandomInteger(currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  };
})();

var createFeatureList = function () {
  var array = [];
  var size = window.random.getRandomInteger(1, FEATURE_ITEMS.length);
  var shuffledArray = window.random.createShuffledArray(FEATURE_ITEMS.length);
  for (var i = 0; i < size; i++) {
    array[i] = FEATURE_ITEMS[shuffledArray[i]];
  }
  return array;
};

var createAdvertisement = function (avatarValue, offerValue, locationX, locationY) {
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + avatarValue + '.png'
    },
    offer: {
      title: OFFER_TITLES[offerValue],
      address: locationX + ', ' + locationY,
      price: window.random.getRandomInteger(1000, 10000000),
      type: window.random.getRandomElement(OFFER_TYPES),
      rooms: window.random.getRandomInteger(1, 5),
      guests: window.random.getRandomInteger(1, 50),
      checkin: window.random.getRandomElement(OFFER_CHECKIN_OPTIONS),
      checkout: window.random.getRandomElement(OFFER_CHECKOUT_OPTIONS),
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
var avatarValues = window.random.createShuffledArray(ADVERTICEMENT_NUMBER);
var offerValues = window.random.createShuffledArray(OFFER_TITLES.length);
for (var i = 0; i < ADVERTICEMENT_NUMBER; i++) {
  var locationX = window.random.getRandomInteger(300, 900);
  var locationY = window.random.getRandomInteger(100, 500);
  advertisements[i] = createAdvertisement(avatarValues[i] + 1, offerValues[i], locationX, locationY);
}

var mapPinsBlock = document.querySelector('.map__pins');
var mapBlock = document.querySelector('.map');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var createMapPin = function (advertisement) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var x = advertisement.location.x - PIN_WIDTH / 2;
  var y = advertisement.location.y - PIN_HEIGHT;
  mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
  mapPin.querySelector('img').src = advertisement.author.avatar;
  return mapPin;
};

var fragmentPins = document.createDocumentFragment();
for (var j = 0; j < ADVERTICEMENT_NUMBER; j++) {
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
  mapCard.querySelector('h4').textContent = OFFER_TYPE_NAMES[advertisement.offer.type];
  mapCard.querySelector('p:nth-of-type(3)').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  mapCard.querySelector('p:last-of-type').textContent = advertisement.offer.description;
  mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
  newFeatures(mapCard, advertisement);
  return mapCard;
};

var fragmentCards = document.createDocumentFragment();
for (var h = 0; h < ADVERTICEMENT_NUMBER; h++) {
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

var titleInput = noticeForm.querySelector('#title');
titleInput.addEventListener('invalid', onTitleValidate);
function onTitleValidate() {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Слишком короткий заголовок');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Слишком длинный заголовок');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  }
}

var timeInSelect = noticeForm.querySelector('#timein');
var timeOutSelect = noticeForm.querySelector('#timeout');
timeInSelect.addEventListener('change', onTimeInSelectChangeInTimeOut);
function onTimeInSelectChangeInTimeOut() {
  timeOutSelect.options.selectedIndex = timeInSelect.options.selectedIndex;
}
timeOutSelect.addEventListener('change', onTimeOutSelectChangeInTimeIn);
function onTimeOutSelectChangeInTimeIn() {
  timeInSelect.options.selectedIndex = timeOutSelect.options.selectedIndex;
}

function getValue(selectName, i3) {
  return selectName.options[i3].value;
}

var typeSelect = noticeForm.querySelector('#type');
var priceInput = noticeForm.querySelector('#price');
var offerTypeMinPrices = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};
typeSelect.addEventListener('change', onTypeSelectChangeMinPrice);
function onTypeSelectChangeMinPrice() {
  var index = typeSelect.options.selectedIndex;
  var type = getValue(typeSelect, index);
  priceInput.min = offerTypeMinPrices[type];
}

var roomNumberSelect = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');
roomNumberSelect.addEventListener('change', onRoomNumberSelectChangeCapacity);
function onRoomNumberSelectChangeCapacity() {
  var index = roomNumberSelect.options.selectedIndex;
  var roomNumber = Number(getValue(roomNumberSelect, index));
  if ((roomNumber >= 1) && (roomNumber <= 3)) {
    capacity.options.selectedIndex = getCapacityOptionIndex(roomNumber);
  } else if (roomNumber === 100) {
    capacity.options.selectedIndex = getCapacityOptionIndex(0);
  }
}
function getCapacityOptionIndex(x) {
  for (var i4 = 0; i4 < capacity.options.length; i4++) {
    if (capacity.options[i4].value === String(x)) {
      var capacityIndex = i4;
    }
  }
  return capacityIndex;
}
