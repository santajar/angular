(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('focus', focus);

  /* @ngInject */
  function focus($timeout, $window) {
    return function(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element) {
          element.focus();
        }
      });
    };
  }
})();
