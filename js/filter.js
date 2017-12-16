'use strict';

(function () {
  window.filterPins = filterPins;
  function filterPins() {
    var filterContainer = document.querySelector('.map__filters');
    var housingType = filterContainer.querySelector('#housing-type');
    window.filteredAdvertisements = window.advertisements.slice();

    filterContainer.addEventListener('change', onFilterChange);

    function onFilterChange() {
      window.removeMapCard();
      window.filteredAdvertisements = window.advertisements
          .filter(setTypeChange);
      window.showPins(window.filteredAdvertisements);
    }

    function setTypeChange(advertisement) {
      return (!housingType.options.selectedIndex) || (advertisement.offer.type === getSelectedValue(housingType));
    }

    function getSelectedValue(selectName) {
      var selectedIndex = selectName.options.selectedIndex;
      return selectName.options[selectedIndex].value;
    }
  }
})();
