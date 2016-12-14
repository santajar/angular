(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('adminGroupService', adminGroupService);

  /* @ngInject */
  function adminGroupService(dataService, Restangular, AuthService, TransformJsonProperyServices) {
    var groups = Restangular.all('groups');
    var editgroup = Restangular.all('groupUpdate');
    var deletegroup = Restangular.all('groupDelete');
    var groupmenu = Restangular.all('groupmenu');
    var deletegroupmenu = Restangular.all('groupMenuDelete');
    var group = Restangular.all('group/menu');

    var service = {
      getGroup: getGroup,
      getGroups: getGroups,
      addGroup: addGroup,
      addGroupMenu: addGroupMenu,
      updateGroup: updateGroup,
      deleteGroup: deleteGroup,
      deleteGroupMenu: deleteGroupMenu,
      getGroupMenus: getGroupMenus
    };
    return service;

    ////////////////

    function addGroup(data) {
      var param = angular.copy(data);
      param.lastUser = AuthService.getUsername();
      param.createUser = AuthService.getUsername();
      return groups.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

    function addGroupMenu(param) {
      param.lastUpdate = new Date().getTime();
      param.createDate = new Date().getTime();
      param.lastUser = AuthService.getUsername();
      param.createUser = AuthService.getUsername();
      param = TransformJsonProperyServices.decamelizeKeys(param);
      return groupmenu.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

    function deleteGroup(id) {
      return deletegroup.post(angular.toJson({
        id: id
      })).then(function (response) {
        return response.plain();
      });
    }

    function deleteGroupMenu(id) {
      return deletegroupmenu.post(angular.toJson({
        id: id
      })).then(function (response) {
        return response.plain();
      });
    }

    function getGroup(id) {
      return groups.get(id).then(function (response) {
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

    function getGroups() {
      return groups.getList().then(function (response) {
        var generated = response.plain();
        response = TransformJsonProperyServices.camelizeKeys(generated);
        return response;
      });
    }

    function getGroupMenus(id) {
      return group.all(id).getList().then(function (response) {
        return response.plain();
      });
    }

    function updateGroup(data) {
      var param = angular.copy(data);
      param.lastUpdate = new Date();
      param.createDate = dataService.localToMS(param.createDate);
      param.lastUser = AuthService.getUsername();
      return editgroup.post(angular.toJson(param)).then(function (response) {
        return response.plain();
      });
    }

  }
})();
