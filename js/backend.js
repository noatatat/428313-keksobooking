'use strict';

(function () {
  var URL = {
    UPLOAD: 'https://1510.dump.academy/keksobooking/',
    DOWNLOAD: 'https://1510.dump.academy/keksobooking/data'
  };
  var CONNECTION_DEFAULT_TIMEOUT = 10000;

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

      xhr.timeout = CONNECTION_DEFAULT_TIMEOUT;

      xhr.open('POST', URL.UPLOAD);
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

      xhr.timeout = CONNECTION_DEFAULT_TIMEOUT;

      xhr.open('GET', URL.DOWNLOAD);
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
