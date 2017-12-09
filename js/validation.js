'use strict';

(function () {
  var titleInput = window.noticeForm.querySelector('#title');
  var defaultBorderColor = titleInput.style.borderColor;
  window.adressInput = window.noticeForm.querySelector('#address');
  titleInput.addEventListener('invalid', onTitleValidate);
  window.adressInput.addEventListener('invalid', onAdressValidate);

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
    window.adressInput.style.borderColor = 'red';
    if (window.adressInput.validity.valueMissing) {
      window.adressInput.setCustomValidity('Обязательное поле');
    } else {
      window.adressInput.setCustomValidity('');
    }
    if (window.adressInput.validity.valid) {
      window.adressInput.style.borderColor = defaultBorderColor;
    }
  }
})();
