'use strict';

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
      adressInput.setCustomValidity('');
    }
    if (adressInput.validity.valid) {
      adressInput.style.borderColor = defaultBorderColor;
    }
  }
})();
