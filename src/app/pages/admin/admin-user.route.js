(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(routeAdminUser);

  /** @ngInject */
  function routeAdminUser($stateProvider) {
    $stateProvider
      .state('admin.user', {
        url: "/user",
        templateUrl: "app/pages/admin/user/admin-user-list.html",
        controller: "AdminUserListController",
        controllerAs: "au",
        title: 'User'
      })
      .state('admin.user.add', {
        url: "/add",
        templateUrl: "app/pages/admin/user/admin-user-add.html",
        controller: "AdminUserAddController",
        controllerAs: "vm",
        title: "Add User",
        resolve: {
          roles: ['adminRoleService', function (adminRoleService) {
            return adminRoleService.getRoles().then(function(response) {
              return response;
            });
          }]
        }
      })
      .state('admin.user.edit', {
        url: "/edit/:id",
        templateUrl: "app/pages/admin/user/admin-user-edit.html",
        controller: "AdminUserEditController",
        controllerAs: "vm",
        title: "Edit User",
        resolve: {
          user: ['adminUserService', '$stateParams', function (adminUserService, $stateParams) {
            return adminUserService.getUser($stateParams.id).then(function(response) {
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
      .state('admin.user.delete', {
        url: "/delete/:id",
        templateUrl: "app/pages/admin/user/admin-user-delete.html",
        controller: "AdminUserDeleteController",
        controllerAs: "vm",
        title: "Delete User",
        resolve: {
          user: ['adminUserService', '$stateParams', function (adminUserService, $stateParams) {
            return adminUserService.getUser($stateParams.id).then(function(response) {
              return response[0];
            });
          }]
        }
      });

  }

})();
