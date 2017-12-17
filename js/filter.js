'use strict';

(function () {
  var PRICE_EDGE = {
    low: 10000,
    middle: 50000
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
      return (!housingType.options.selectedIndex) || (type === getSelectedValue(housingType));
    }

    function setPriceChange(advertisement) {
      var price = advertisement.offer.price;
      switch (getSelectedValue(housingPrice)) {
        case 'low' :
          return price < PRICE_EDGE.low;
        case 'middle' :
          return (price >= PRICE_EDGE.low) && (price < PRICE_EDGE.middle);
        case 'high' :
          return price >= PRICE_EDGE.middle;
        default :
          return true;
      }
    }

    function setRoomsChange(advertisement) {
      var rooms = advertisement.offer.rooms.toString();
      return (!housingRooms.options.selectedIndex) || (rooms === getSelectedValue(housingRooms));
    }

    function setGuestChange(advertisement) {
      var guests = advertisement.offer.guests.toString();
      return (!housingGuests.options.selectedIndex) || (guests === getSelectedValue(housingGuests));
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

    function getSelectedValue(selectName) {
      var selectedIndex = selectName.options.selectedIndex;
      return selectName.options[selectedIndex].value;
    }
  }
})();
