(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .directive('pageTitle', pageTitle);

  /* @ngInject */
  function pageTitle($rootScope, $timeout) {
    return {
      link: function(scope, element) {
        var listener = function(event, toState, toParams, fromState, fromParams) {
          // Default title - load on Dashboard 1
          var companyName = 'FujiSeat';
          var title = companyName + ' | Stamping Information System';
          // Create your own title pattern
          if (toState.data && toState.data.pageTitle) title = companyName + ' | ' + toState.data.pageTitle;
          $timeout(function() {
            element.text(title);
          });
        };
        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  }
})();
