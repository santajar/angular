/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.tabs', ['uiGmapgoogle-maps'])
      .config(routeConfig)
      .controller('mainCtrl', function($scope) {
          $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
      });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.tabs', {
          url: '/tabs',
          templateUrl: 'app/pages/tabs/tabs.html',
          title: 'Tabs & Accordions',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();
