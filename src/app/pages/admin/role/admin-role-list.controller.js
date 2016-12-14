(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminRoleListController', AdminRoleListController);

  /* @ngInject */
  function AdminRoleListController(adminRoleService, dataService, DTOptionsBuilder, DTColumnBuilder, SweetAlert, $compile, $scope, $state) {
    var vm = this;
    vm.dtInstance = {};
    vm.editButton = editButton;
    vm.deleteButton = deleteButton;
    vm.users = {};

    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return getRoleList();
        }).withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [2, 'desc'])
        .withButtons([{
          text: 'ADD ROLE',
          key: 1,
          action: addButton
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('roleName').withTitle('ROLE NAME'),
        DTColumnBuilder.newColumn('lastUser').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function deleteButton(user) {
      $state.go('admin.role.delete', {
        id: user
      });
    }

    function addButton() {
      $state.go('admin.role.add');
    }

    function editButton(role) {
      $state.go('admin.role.edit', {
        id: role
      });
    }

    function getRoleList() {
      return adminRoleService.getRoles();
    }

    function tableActionButton(data) {
      return '<button class="btn btn-warning" ng-click="ar.editButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="ar.deleteButton(\'' + data.id + '\', \'' + data.roleName + '\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data, type, full) {
      return dataService.msToLocalDateTime(full.lastUpdate);
    }

  }
})();
