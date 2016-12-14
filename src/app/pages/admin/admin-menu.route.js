(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(routeAdminMenu);

  /** @ngInject */
  function routeAdminMenu($stateProvider) {
    $stateProvider
      .state('admin.menu', {
        url: "/menu",
        templateUrl: "app/pages/admin/menu/admin-menu-list.html",
        controller: "AdminMenuListController",
        controllerAs: "am",
        title: 'Menu',
        resolve: {
          menus: ['adminMenuService', '$stateParams', function (adminMenuService, $stateParams) {
            return adminMenuService.getMenus().then(function (response) {
              return response;
            });
          }]
        }
      })
      .state('admin.menu.add', {
        url: "/add",
        templateUrl: "app/pages/admin/menu/admin-menu-add.html",
        controller: "AdminMenuAddController",
        controllerAs: "vm",
        title: "Add Menu",
      })
      .state('admin.menu.edit', {
        url: "/edit/:id",
        templateUrl: "app/pages/admin/menu/admin-menu-edit.html",
        controller: "AdminMenuEditController",
        controllerAs: "vm",
        title: "Edit Menu",
        resolve: {
          menu: ['adminMenuService', '$stateParams', function (adminMenuService, $stateParams) {
            return adminMenuService.getMenu($stateParams.id).then(function (response) {
              return response.list[0];
            });
          }]
        }
      })
      .state('admin.menu.delete', {
        url: "/delete/:id",
        templateUrl: "app/pages/admin/menu/admin-menu-delete.html",
        controller: "AdminMenuDeleteController",
        controllerAs: "vm",
        title: "Delete Menu",
        resolve: {
          menu: ['adminMenuService', '$stateParams', function (adminMenuService, $stateParams) {
            return adminMenuService.getMenu($stateParams.id).then(function (response) {
              return response.list[0];
            });
          }]
        }
      });

  }

})();
