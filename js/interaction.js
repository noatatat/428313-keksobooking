'use strict';

(function () {
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
