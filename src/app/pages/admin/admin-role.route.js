(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(routeAdminRole);

  /** @ngInject */
  function routeAdminRole($stateProvider) {
    $stateProvider
      .state('admin.role', {
        url: "/role",
        templateUrl: "app/pages/admin/role/admin-role-list.html",
        controller: "AdminRoleListController",
        controllerAs: "ar",
        title: 'Role'
      })
      .state('admin.role.add', {
        url: "/add",
        templateUrl: "app/pages/admin/role/admin-role-add.html",
        controller: "AdminRoleAddController",
        controllerAs: "vm",
        title: "Add Role",
      })
      .state('admin.role.edit', {
        url: "/edit/:id",
        templateUrl: "app/pages/admin/role/admin-role-edit.html",
        controller: "AdminRoleEditController",
        controllerAs: "vm",
        title: "Edit Role",
        resolve: {
          role: ['adminRoleService', '$stateParams', function (adminRoleService, $stateParams) {
            return adminRoleService.getRole($stateParams.id).then(function(response) {
              return response.list[0];
            });
          }]
        }
      })
      .state('admin.role.delete', {
        url: "/delete/:id",
        templateUrl: "app/pages/admin/role/admin-role-delete.html",
        controller: "AdminRoleDeleteController",
        controllerAs: "vm",
        title: "Delete Role",
        resolve: {
          role: ['adminRoleService', '$stateParams', function (adminRoleService, $stateParams) {
            return adminRoleService.getRole($stateParams.id).then(function(response) {
              return response.list[0];
            });
          }]
        }
      });

  }

})();
