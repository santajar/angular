(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminMenuListController', AdminMenuListController);

  /* @ngInject */
  function AdminMenuListController(adminMenuService, DTOptionsBuilder, DTColumnBuilder, $state, $compile, dataService, $scope, menus, logger) {
    var vm = this;
    vm.menus = menus;
    vm.dtInstance = {};
    vm.editButton = editButton;
    vm.deleteButton = deleteButton;


    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return getMenuList();
        }).withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [5, 'desc'])
        .withButtons([{
          text: 'ADD MENU',
          key: 1,
          action: addButton
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('menuName').withTitle('Menu Name'),
        DTColumnBuilder.newColumn('parentName').withTitle('Parent Menu'),
        DTColumnBuilder.newColumn('sequence').withTitle('sequence'),
        DTColumnBuilder.newColumn('link').withTitle('link'),
        DTColumnBuilder.newColumn('lastUser').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function deleteButton(id) {
      $state.go('admin.menu.delete', {
        id: id
      });
    }

    function addButton() {
      $state.go('admin.menu.add');
    }

    function editButton(id) {
      $state.go('admin.menu.edit', {
        id: id
      });
    }

    function getMenuList() {
      return adminMenuService.getMenus();
    }

    function tableActionButton(data) {
      return '<button class="btn btn-warning" ng-click="am.editButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="am.deleteButton(\'' + data.id + '\', \'' + data.menuName + '\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data, type, full) {
      return dataService.msToLocalDateTime(full.lastUpdate);
    }
  }
})();
