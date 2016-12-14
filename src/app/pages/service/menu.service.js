(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('MenuService', MenuService);

  /* @ngInject */
  function MenuService(logger, Restangular, $timeout, baSidebarService) {
    var menus = Restangular.all('menu');
    var service = {
      getMenus: getMenus,
      setMenu: setMenu
    };

    return service;

    function getMenus(cred) {
      return menus.post(angular.toJson(cred)).then(function (response) {
        return response.plain();
      });
    }

    function resetMenu() {
      baSidebarService.resetStaticItem();
    }

    function setMenu(list) {
      resetMenu();
      angular.forEach(list,function (v, k) {
        baSidebarService.addStaticItem(v);
      });
    }

  }
})();
