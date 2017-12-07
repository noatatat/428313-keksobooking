'use strict';

(function () {
  window.utils = {
    getRandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(window.utils.getRandom(min, max));
    },

    getRandomElement: function (elements) {
      return elements[window.utils.getRandomInteger(elements.length)];
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
        randomIndex = window.utils.getRandomInteger(currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  };
})();

(function () {
  window.ESC_KEYCODE = 27;
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

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 52;
  var mapPinsBlock = document.querySelector('.map__pins');
  window.mapBlock = document.querySelector('.map');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var createMapPin = function (advertisement) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var x = advertisement.location.x - PIN_WIDTH / 2;
    var y = advertisement.location.y - PIN_HEIGHT;
    mapPin.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    mapPin.querySelector('img').src = advertisement.author.avatar;
    return mapPin;
  };

  var fragmentPins = document.createDocumentFragment();
  for (var j = 0; j < window.ADVERTICEMENT_NUMBER; j++) {
    fragmentPins.appendChild(createMapPin(window.advertisements[j]));
  }
  mapPinsBlock.appendChild(fragmentPins);
})();

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

(function () {
  function disableEachInArray(array, flag) {
    array.forEach(function (element) {
      element.disabled = flag;
    });
  }

  var formFieldsets = document.querySelectorAll('.notice fieldset');
  disableEachInArray(formFieldsets, true);

  var mapPinMain = window.mapBlock.querySelector('.map__pin--main');
  window.noticeForm = document.querySelector('.notice__form');
  mapPinMain.addEventListener('mouseup', function () {
    window.mapBlock.classList.remove('map--faded');
    window.noticeForm.classList.remove('notice__form--disabled');
    disableEachInArray(formFieldsets, false);
  });
})();

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
    if (evt.keyCode === window.ESC_KEYCODE) {
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

(function () {
  var titleInput = window.noticeForm.querySelector('#title');
  var defaultBorderColor = titleInput.style.borderColor;
  var adressInput = window.noticeForm.querySelector('#address');
  titleInput.addEventListener('invalid', onTitleValidate);
  adressInput.addEventListener('invalid', onAdressValidate);
  function onTitleValidate() {
    titleInput.style.borderColor = 'red';
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Слишком короткий заголовок');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Слишком длинный заголовок');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
    if (titleInput.validity.valid) {
      titleInput.style.borderColor = defaultBorderColor;
    }
  }
  function onAdressValidate() {
    adressInput.style.borderColor = 'red';
    if (adressInput.validity.valueMissing) {
      adressInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
    if (adressInput.validity.valid) {
      adressInput.style.borderColor = defaultBorderColor;
    }
  }

  var timeInSelect = window.noticeForm.querySelector('#timein');
  var timeOutSelect = window.noticeForm.querySelector('#timeout');
  timeInSelect.addEventListener('change', onTimeInSelectChangeInTimeOut);

  function onTimeInSelectChangeInTimeOut() {
    timeOutSelect.options.selectedIndex = timeInSelect.options.selectedIndex;
  }

  timeOutSelect.addEventListener('change', onTimeOutSelectChangeInTimeIn);

  function onTimeOutSelectChangeInTimeIn() {
    timeInSelect.options.selectedIndex = timeOutSelect.options.selectedIndex;
  }

  function getValue(selectName, optionIndex) {
    return selectName.options[optionIndex].value;
  }

  var typeSelect = window.noticeForm.querySelector('#type');
  var priceInput = window.noticeForm.querySelector('#price');
  typeSelect.addEventListener('change', onTypeSelectChangeMinPrice);

  function onTypeSelectChangeMinPrice() {
    var index = typeSelect.options.selectedIndex;
    var type = getValue(typeSelect, index);
    priceInput.min = window.OFFER_TYPE_MIN_PRICES[type];
  }

  var roomNumberSelect = window.noticeForm.querySelector('#room_number');
  var capacity = window.noticeForm.querySelector('#capacity');
  hideAllExept(2);
  capacity.options.selectedIndex = 2;
  roomNumberSelect.addEventListener('change', onRoomNumberSelectChangeCapacity);

  function onRoomNumberSelectChangeCapacity() {
    var index = roomNumberSelect.options.selectedIndex;
    var roomNumber = Number(getValue(roomNumberSelect, index));
    if (roomNumber === 100) {
      hideAllExept(3);
    } else {
      if (roomNumber >= 1) {
        hideAllExept(2);
      }
      if (roomNumber >= 2) {
        hiddenOptionOff(1);
      }
      if (roomNumber >= 3) {
        hiddenOptionOff(0);
      }
    }
  }

  function hideOptionsAll() {
    [].forEach.call(capacity, function (option) {
      option.hidden = true;
    });
  }

  function hiddenOptionOff(optionIndex) {
    capacity.options[optionIndex].hidden = false;
  }

  function hideAllExept(indexExept) {
    hideOptionsAll();
    hiddenOptionOff(indexExept);
    capacity.options.selectedIndex = indexExept;
  }
})();
