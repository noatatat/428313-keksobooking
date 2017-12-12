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

  window.setFormStartCondition = setFormStartCondition;
  function setFormStartCondition() {
    window.utils.hideAllOptionsExept(capacity, 2);
    capacity.options.selectedIndex = 2;
  }
  setFormStartCondition();

  roomNumberSelect.addEventListener('change', function () {
    window.synchronizeFields(typeSelect, priceInput, syncRoomsAndCapacity);
  });

  function syncRoomsAndCapacity() {
    var index = roomNumberSelect.options.selectedIndex;
    var roomNumber = Number(window.utils.getOptionValue(roomNumberSelect, index));
    if (roomNumber === 100) {
      window.utils.hideAllOptionsExept(capacity, 3);
    } else {
      if (roomNumber >= 1) {
        window.utils.hideAllOptionsExept(capacity, 2);
      }
      if (roomNumber >= 2) {
        window.utils.hiddenOptionOff(capacity, 1);
      }
      if (roomNumber >= 3) {
        window.utils.hiddenOptionOff(capacity, 0);
      }
    }
  }

})();
