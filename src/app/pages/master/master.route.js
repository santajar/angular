(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(RouteMaster);

  /** @ngInject */
  function RouteMaster($stateProvider) {
    $stateProvider
      .state('master', {
        parent: 'app',
        url: '/master',
        template: '<ui-view/>'
      })
      .state('master.banks-list', {
        url: "/banks/list",
        templateUrl: 'app/pages/layout/list-layout.html',
        controller: 'MasterBanksListController',
        controllerAs: 'vm'
      })
      .state('master.ca-list', {
        url: "/ca/list",
        templateUrl: 'app/pages/layout/list-layout.html',
        controller: 'MasterCollectingAgentsListController',
        controllerAs: 'vm'
      })
    ;
  }

}());
