'use strict';

(function () {
  var POSTAL_DATA = {
    UPLOAD: {
      URL: 'https://1510.dump.academy/keksobooking/',
      METHOD: 'POST'
    },
    DOWNLOAD: {
      URL: 'https://1510.dump.academy/keksobooking/data',
      METHOD: 'GET'
    }
  };
  var CONNECTION_DEFAULT_TIMEOUT = 10000;

  var STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      createAndUseXhr(onLoad, onError, POSTAL_DATA.UPLOAD, data);
    },
    load: function (onLoad, onError) {
      createAndUseXhr(onLoad, onError, POSTAL_DATA.DOWNLOAD);
    }
  };

  function createAndUseXhr(onLoad, onError, postalData, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      switch (evt.target.status) {
        case STATUS_CODE.OK:
          onLoad(evt.target.response);
          break;
        case STATUS_CODE.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case STATUS_CODE.UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case STATUS_CODE.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + evt.target.status + ' ' + evt.target.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = CONNECTION_DEFAULT_TIMEOUT;

    xhr.open(postalData.METHOD, postalData.URL);
    xhr.send(data);
  }
})();
