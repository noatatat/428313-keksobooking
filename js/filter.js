'use strict';

(function () {
  var filterContainer = document.querySelector('.map__filters');
  filterContainer.addEventListener('change', onFilterChange);

  function onFilterChange(evt) {
    //var selectedIndex = evt.target.options.selectedIndex;
    //console.log(evt.target.options[selectedIndex].value);
    //console.log(window.advertisements);

    window.filteredAdvertisement = window.advertisements
        .filter(setTypeChange);
    window.showPins(window.filteredAdvertisement);
    console.log(window.filteredAdvertisement);
  }

  function setTypeChange(advertisement) {
    return advertisement.offer.type === 'flat';
  }
})();
