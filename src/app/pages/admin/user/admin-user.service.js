(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('adminUserService', adminUserService);

  /* @ngInject */
  function adminUserService(AuthService, dataService, md5, Restangular, logger, TransformJsonProperyServices) {
    var reset = Restangular.all('userResetPassword');
    var users = Restangular.all('users');
    var edituser = Restangular.all('userUpdate');
    var deleteuser = Restangular.all('userDelete');
    var groupsrole = Restangular.all('groupsRole');

    var service = {
      getUser: getUser,
      getUsers: getUsers,
      updateUser: updateUser,
      deleteUser: deleteUser,
      addUser: addUser,
      resetPassword: resetPassword,
      groupsRole: groupsRole
    };
    return service;

    ////////////////

    function addUser(data) {
      var param = angular.copy(data);
      param.password = md5.createHash(param.password);
      param.lastUpdate = new Date().getTime();
      param.createDate = new Date().getTime();
      param.lastUser = AuthService.getUsername();
      param.createUser = AuthService.getUsername();
      return users.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

    function deleteUser(id) {
      return deleteuser.post(angular.toJson({
        id: id
      })).then(function (response) {
        return response.plain();
      });
    }

    function getUser(id) {
      return users.get(id).then(function (response) {
        var generated = response.plain();
        var temp = angular.copy(generated.list);
        temp = TransformJsonProperyServices.camelizeKeys(temp);
        if (generated.rc === '00') {
          temp[0].createDate = dataService.msToLocalDateTime(temp[0].createDate);
          temp[0].lastUpdate = dataService.msToLocalDateTime(temp[0].lastUpdate);
        }
        return temp;
      });
    }

    function getUsers() {
      return users.getList().then(function (response) {
        var generated = response.plain();
        response = TransformJsonProperyServices.camelizeKeys(generated);
        return response;
      });
    }

    function groupsRole(roleId) {
      return groupsrole.all(roleId).getList().then(function (response) {
        var generated = response.plain();
        response = TransformJsonProperyServices.camelizeKeys(generated);
        return response;
      });
    }

    function resetPassword(id) {
      logger.warn(id);
      return reset.get(id).then(function (response) {
        return response.plain();
      });
    }

    function updateUser(data) {
      var param = angular.copy(data);
      param.lastUpdate = new Date().getTime();
      param.createDate = dataService.localToMS(param.createDate);
      param.lastUser = AuthService.getUsername();
      return edituser.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

  }
})();
