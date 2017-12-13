'use strict';

(function () {
  window.synchronizeFields = synchronizeFields;
  function synchronizeFields(fieldChanged, fieldSynced, doSyncType) {
    if (typeof doSyncType === 'function') {
      doSyncType(fieldChanged, fieldSynced);
    }
  }
})();
