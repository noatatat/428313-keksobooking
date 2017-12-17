'use strict';

(function () {
  var PRICE_EDGE = {
    LOW: 10000,
    MIDDLE: 50000
  };

  window.filterPins = filterPins;
  function filterPins() {
    var filter = document.querySelector('.map__filters');
    var housingType = filter.querySelector('#housing-type');
    var housingPrice = filter.querySelector('#housing-price');
    var housingRooms = filter.querySelector('#housing-rooms');
    var housingGuests = filter.querySelector('#housing-guests');
    var housingFeatures = filter.querySelector('#housing-features');

    window.filteredAdvertisements = window.advertisements.slice();

    filter.addEventListener('change', onFilterChange);

    function onFilterChange() {
      window.debounce(showFilteredPins, 500);
    }

    function showFilteredPins() {
      window.removeMapCard();
      window.filteredAdvertisements = window.advertisements
          .filter(setTypeChange)
          .filter(setPriceChange)
          .filter(setRoomsChange)
          .filter(setGuestChange)
          .filter(setFeatureChecked);
      window.showPins(window.filteredAdvertisements);
    }

    function setTypeChange(advertisement) {
      var type = advertisement.offer.type;
      var selectedValue = window.utils.getSelectedValue(housingType);
      return (!housingType.options.selectedIndex) || (type === selectedValue);
    }

    function setPriceChange(advertisement) {
      var price = advertisement.offer.price;
      var truth;
      switch (window.utils.getSelectedValue(housingPrice)) {
        case 'low' :
          truth = price < PRICE_EDGE.LOW;
          break;
        case 'middle' :
          truth = (price >= PRICE_EDGE.LOW) && (price < PRICE_EDGE.MIDDLE);
          break;
        case 'high' :
          truth = price >= PRICE_EDGE.MIDDLE;
          break;
        default :
          truth = true;
      }
      return truth;
    }

    function setRoomsChange(advertisement) {
      var rooms = advertisement.offer.rooms.toString();
      var selectedValue = window.utils.getSelectedValue(housingRooms);
      return (!housingRooms.options.selectedIndex) || (rooms === selectedValue);
    }

    function setGuestChange(advertisement) {
      var guests = advertisement.offer.guests.toString();
      var selectedValue = window.utils.getSelectedValue(housingGuests);
      return (!housingGuests.options.selectedIndex) || (guests === selectedValue);
    }

    function setFeatureChecked(advertisement) {
      var checkedFeatures = getCheckedValues();
      var offerFeatures = advertisement.offer.features;
      var result = 1;
      if (!checkedFeatures) {
        return true;
      } else {
        checkedFeatures.forEach(function (feature) {
          if (offerFeatures.includes(feature)) {
            result *= 1;
          } else {
            result *= 0;
          }
        });
        return result;
      }
    }

    function getCheckedValues() {
      var checkedCheckboxes = housingFeatures.querySelectorAll('input:checked');
      return [].map.call(checkedCheckboxes, function (checkbox) {
        return checkbox.value;
      });
    }
  }
})();
