'use strict';

(function () {
  var uploadURL = 'https://1510.dump.academy/keksobooking/';
  var downloadURL = 'https://1510.dump.academy/keksobooking/data';
  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        window.backend.errorTest(evt, onLoad, onError);
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', uploadURL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        window.backend.errorTest(evt, onLoad, onError);
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', downloadURL);
      xhr.send();
    },
    errorTest: function (evt, onLoad, onError) {
      var error;
      switch (evt.target.status) {
        case 200:
          onLoad(evt.target.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + evt.target.status + ' ' + evt.target.statusText;
      }
      if (error) {
        onError(error);
      }
    }
  };
})();
