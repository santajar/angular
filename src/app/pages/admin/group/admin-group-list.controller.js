(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminGroupListController', AdminGroupListController);

  /* @ngInject */
  function AdminGroupListController(adminGroupService, dataService, DTOptionsBuilder, DTColumnBuilder, SweetAlert, $compile, $scope, $state, logger) {
    var vm = this;
    vm.dtInstance = {};
    vm.editButton = editButton;
    vm.deleteButton = deleteButton;
    vm.menuButton = menuButton;
    vm.users = {};

    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return getGroupList();
        }).withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [4, 'desc'])
        .withButtons([{
          text: 'ADD GROUP',
          key: 1,
          action: addButton
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('roleName').withTitle('ROLE NAME'),
        DTColumnBuilder.newColumn('groupName').withTitle('GROUP NAME'),
        DTColumnBuilder.newColumn(null).withTitle('MENU').notSortable().renderWith(tableMenuButton),
        DTColumnBuilder.newColumn('lastUser').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function deleteButton(user) {
      $state.go('admin.group.delete', {
        id: user
      });
    }

    function addButton() {
      $state.go('admin.group.add');
    }

    function editButton(group) {
      $state.go('admin.group.edit', {
        id: group
      });
    }

    function getGroupList() {
      return adminGroupService.getGroups();
    }

    function menuButton(group) {
      $state.go('admin.group.menu', {
        id: group
      });
    }

    function tableActionButton(data) {
      return '<button class="btn btn-warning" ng-click="ag.editButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="ag.deleteButton(\'' + data.id + '\', \'' + data.groupName + '\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableMenuButton(data) {
      return '<button class="btn btn-primary" ng-click="ag.menuButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-eye-open"></i> DAFTAR MENU</button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data, type, full) {
      return dataService.msToLocalDateTime(full.lastUpdate);
    }

  }
})();
