'use strict';

(function () {
  var timeInSelect = window.noticeForm.querySelector('#timein');
  var timeOutSelect = window.noticeForm.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    window.synchronizeFields(timeInSelect, timeOutSelect, syncTimes);
  });

  timeOutSelect.addEventListener('change', function () {
    window.synchronizeFields(timeOutSelect, timeInSelect, syncTimes);
  });

  function syncTimes(timeChanged, timeSynced) {
    timeSynced.options.selectedIndex = timeChanged.options.selectedIndex;
  }

  var typeSelect = window.noticeForm.querySelector('#type');
  var priceInput = window.noticeForm.querySelector('#price');

  typeSelect.addEventListener('change', function () {
    window.synchronizeFields(typeSelect, priceInput, syncTypeAndMinPrice);
  });

  function syncTypeAndMinPrice(typeChanged, priceSynced) {
    var index = typeChanged.options.selectedIndex;
    var type = window.utils.getOptionValue(typeChanged, index);
    priceSynced.min = window.OFFER_TYPE_MIN_PRICES[type];
  }

  var roomNumberSelect = window.noticeForm.querySelector('#room_number');
  var capacity = window.noticeForm.querySelector('#capacity');

  hideAllExept(2);
  capacity.options.selectedIndex = 2;
  roomNumberSelect.addEventListener('change', function () {
    window.synchronizeFields(typeSelect, priceInput, syncRoomsAndCapacity);
  });

  function syncRoomsAndCapacity() {
    var index = roomNumberSelect.options.selectedIndex;
    var roomNumber = Number(window.utils.getOptionValue(roomNumberSelect, index));
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
