'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarUploadInput = window.noticeForm.querySelector('#avatar');
  var avatarImage = window.noticeForm.querySelector('.notice__preview img');
  var photoContainer = window.noticeForm.querySelector('.form__photo-container');
  var adretisementImageInput = photoContainer.querySelector('#images');

  function uploadPhoto(inputField, doThisWhenUpload) {
    inputField.addEventListener('change', function () {
      var file = inputField.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          doThisWhenUpload(reader);
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function updateAvatar(reader) {
    avatarImage.src = reader.result;
  }

  function showImage(reader) {
    var img = document.createElement('img');
    img.src = reader.result;
    img.style = 'max-height: 35px; width: auto; margin-right: 5px';
    photoContainer.appendChild(img);
  }

  uploadPhoto(avatarUploadInput, updateAvatar);
  uploadPhoto(adretisementImageInput, showImage);
})();
