(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminUserListController', AdminUserListController);

  /* @ngInject */
  function AdminUserListController(adminUserService, adminGroupService, adminRoleService, dataService, DTOptionsBuilder, DTColumnBuilder, SweetAlert, $compile, $scope, $state) {
    var vm = this;
    vm.dtInstance = {};
    vm.deleteButton = deleteButton;
    vm.editButton = editButton;
    vm.resetButton = resetButton;

    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return getUserList();
        })
        .withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [3, 'desc'])
        .withButtons([
          {
            text: 'ADD USER',
            key: 1,
            action: addButton
          }
        ])
      ;
      vm.dtColumns = [
        DTColumnBuilder.newColumn('name').withTitle('NAME'),
        DTColumnBuilder.newColumn('username').withTitle('USERNAME'),
        DTColumnBuilder.newColumn('email').withTitle('EMAIL'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
      getGroups();
      getRoles();
    }

    function addButton() {
      $state.go('admin.user.add');
    }

    function deleteButton(user) {
      $state.go('admin.user.delete', { id: user});
    }

    function editButton(user) {
      $state.go('admin.user.edit', { id: user });
    }

    function resetButton(id, username) {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "This user password will be resetted.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, reset it!",
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            return adminUserService.resetPassword(id).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Changed!", "Username " + username + " password has been changed.", "success");
                  reload();
                } else {
                  SweetAlert.swal("Failed", response.desc, "error");
                  reload();
                }
              },
              function (response) {
                if (response.status !== '200') {
                  SweetAlert.swal("Failed", "Connection to Server Error", "error");
                  reload();
                }
              }
            );
          }
        }
      );
    }

    function getGroups() {
      return adminGroupService.getGroups().then(function(response) {
        vm.groups = response;
      });
    }

    function getRoles() {
      return adminRoleService.getRoles().then(function(response) {
        vm.roles = response;
      });
    }

    function getUserList() {
      return adminUserService.getUsers();
    }

    function tableActionButton(data) {
      return '<button class="btn btn-warning" ng-click="au.editButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="au.deleteButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-trash"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="au.resetButton(\'' + data.id + '\', \'' + data.username + '\')"><i class="fa fa-key"></i></button>'
        ;
    }

    function reload() {
      $state.go($state.current, {}, {
        reload: true
      });
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data, type, full) {
      return dataService.msToLocalDateTime(full.lastUpdate);
    }

  }
})();
