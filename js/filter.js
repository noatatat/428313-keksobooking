'use strict';

(function () {
  var filterContainer = document.querySelector('.map__filters');
  filterContainer.addEventListener('change', function (evt) {
    console.log(evt.target);
  });
})();
