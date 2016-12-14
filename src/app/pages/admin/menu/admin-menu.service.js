(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('adminMenuService', adminMenuService);

  /* @ngInject */
  function adminMenuService(dataService, Restangular, AuthService, TransformJsonProperyServices) {
    var menus = Restangular.all('menus');
    var editmenu = Restangular.all('menuUpdate');
    var deletemenu = Restangular.all('menuDelete');

    var service = {
      getMenu: getMenu,
      getMenus: getMenus,
      updateMenu: updateMenu,
      deleteMenu: deleteMenu,
      addMenu: addMenu
    };
    return service;

    ////////////////

    function addMenu(param) {
      param.lastUser = AuthService.getUsername();
      param.createUser = AuthService.getUsername();
      return menus.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

    function deleteMenu(id) {
      return deletemenu.post(angular.toJson({
        id: id
      })).then(function (response) {
        return response.plain();
      });
    }

    function getMenu(id) {
      return menus.get(id).then(function (response) {
        response = response.plain();
        if (response.rc === '00') {
          response.list[0].createDate = dataService.msToLocalDateTime(response.list[0].createDate);
          response.list[0].lastUpdate = dataService.msToLocalDateTime(response.list[0].lastUpdate);
        }
        return response;
      });
    }

    function getMenus() {
      return menus.getList().then(function (response) {
        var generated = response.plain();
        response = TransformJsonProperyServices.camelizeKeys(generated);
        return response;
      });
    }

    function updateMenu(param) {
      param.lastUpdate = new Date();
      param.createDate = dataService.localToMS(param.createDate);

      return editmenu.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }
  }
})();
