(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(routeAdminGroup);

  /** @ngInject */
  function routeAdminGroup($stateProvider) {
    $stateProvider
      .state('admin.group', {
        url: "/group",
        templateUrl: "app/pages/admin/group/admin-group-list.html",
        controller: "AdminGroupListController",
        controllerAs: "ag",
        title: 'Group'
      })
      .state('admin.group.menu', {
        url: "/menu/:id",
        templateUrl: "app/pages/admin/group/admin-group-menu-list.html",
        controller: "AdminGroupMenuListController",
        controllerAs: "vm",
        title: 'Group Menu List',
        resolve: {
          group: ['adminGroupService', '$stateParams', function (adminGroupService, $stateParams) {
            return adminGroupService.getGroup($stateParams.id).then(function(response) {
              return response[0];
            });
          }]
        }
      })
      .state('admin.group.add', {
        url: "/add",
        templateUrl: "app/pages/admin/group/admin-group-add.html",
        controller: "AdminGroupAddController",
        controllerAs: "vm",
        title: "Add Group",
        resolve: {
          roles: ['adminRoleService', function (adminRoleService) {
            return adminRoleService.getRoles().then(function(response) {
              return response;
            });
          }]
        }
      })
      .state('admin.group.edit', {
        url: "/edit/:id",
        templateUrl: "app/pages/admin/group/admin-group-edit.html",
        controller: "AdminGroupEditController",
        controllerAs: "vm",
        title: "Edit Group",
        resolve: {
          group: ['adminGroupService', '$stateParams', function (adminGroupService, $stateParams) {
            return adminGroupService.getGroup($stateParams.id).then(function(response) {
              return response[0];
            });
          }],
          roles: ['adminRoleService', function (adminRoleService) {
            return adminRoleService.getRoles().then(function(response) {
              return response;
            });
          }]
        }
      })
      .state('admin.group.delete', {
        url: "/delete/:id",
        templateUrl: "app/pages/admin/group/admin-group-delete.html",
        controller: "AdminGroupDeleteController",
        controllerAs: "vm",
        title: "Delete Group",
        resolve: {
          group: ['adminGroupService', '$stateParams', function (adminGroupService, $stateParams) {
            return adminGroupService.getGroup($stateParams.id).then(function(response) {
              return response[0];
            });
          }]
        }
      });

  }

})();
