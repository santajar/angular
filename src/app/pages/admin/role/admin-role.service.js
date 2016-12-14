(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('adminRoleService', adminRoleService);

  /* @ngInject */
  function adminRoleService(dataService, Restangular, AuthService) {
    var roles = Restangular.all('roles');
    var getroles = Restangular.all('roleFindAll');
    var getrole = Restangular.all('roleFindId');
    var addrole = Restangular.all('roleSave');
    var editrole = Restangular.all('roleUpdate');
    var deleterole = Restangular.all('roleDelete');

    var service = {
      getRole: getRole,
      getRoles: getRoles,
      updateRole: updateRole,
      deleteRole: deleteRole,
      addRole: addRole
    };
    return service;

    ////////////////

    function addRole(param) {
      param.lastUser = AuthService.getUsername();
      param.createUser = AuthService.getUsername();
      return roles.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

    function deleteRole(id) {
      return deleterole.post(angular.toJson({
        id: id
      })).then(function (response) {
        return response.plain();
      });
    }

    function getRole(id) {
      return roles.get(id).then(function (response) {
        response = response.plain();
        if (response.rc === '00') {
          response.list[0].createDate = dataService.msToLocalDateTime(response.list[0].createDate);
          response.list[0].lastUpdate = dataService.msToLocalDateTime(response.list[0].lastUpdate);
        }
        return response;
      });
    }

    function getRoles() {
      return roles.getList().then(function (response) {
        return response.plain();
      });
    }

    function updateRole(param) {
      param.lastUser = AuthService.getUsername();
      param.lastUpdate = new Date();
      delete param.createDate;
      return editrole.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }
  }
})();
