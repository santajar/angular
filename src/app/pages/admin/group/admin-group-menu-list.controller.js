(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminGroupMenuListController', AdminGroupMenuListController);

  /* @ngInject */
  function AdminGroupMenuListController(adminGroupService, adminMenuService, dataService, DTOptionsBuilder, DTColumnBuilder, SweetAlert, $compile, $scope, $state, $stateParams, logger, $uibModal, group) {
    var vm = this;
    vm.dtInstance = {};
    vm.addButton = addButton;
    vm.deleteButton = deleteButton;
    vm.editButton = editButton;
    vm.group = group;

    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(adminGroupService.getGroupMenus($stateParams.id))
        .withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [2, 'desc'])
        .withButtons([{
          text: 'ADD GROUP MENU',
          key: 2,
          action: addButton
        }, {
          text: 'BACK',
          key: 1,
          action: backButton
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('menu_name').withTitle('MENU'),
        DTColumnBuilder.newColumn('last_user').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('last_update').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function addButton() {
      var modalAdd = $uibModal.open({
        templateUrl: 'app/pages/admin/group/admin-group-menu-add.html',
        controller: "AdminGroupMenuAddController",
        controllerAs: "vm",
        backdrop: 'static',
        size: 'lg',
        resolve: {
          menus: ['adminMenuService', '$stateParams', function (adminMenuService, $stateParams) {
            return adminMenuService.getMenus().then(function (response) {
              return response;
            });
          }],
          data: ['adminGroupService', '$stateParams', function (adminGroupService, $stateParams) {
            return adminGroupService.getGroupMenus($stateParams.id).then(function (response) {
              return response;
            });
          }]
        }
      });

      modalAdd.result.then(function (value) {
        var param = {
          idMGroup: $stateParams.id,
          idMMenu: value
        };
        return adminGroupService.addGroupMenu(param).then(function (response) {
          if (response.rc === '00') {
            SweetAlert.swal("SUKSES", "Menu berhasil ditambahkan.", "success");
            reloadTable();
          } else {
            SweetAlert.swal("GAGAL", "Menu Gagal ditambahkan.", "error");
          }
        });
      }, function () {

      });
    }

    function backButton() {
      $state.go('admin.group');
    }

    function deleteButton(id, menu) {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "You will not be able to recover this group menu data!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            return adminGroupService.deleteGroupMenu(id).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Deleted!", "Menu "+ menu +" telah dihapus dari Group "+ vm.group.groupName.toUpperCase(), "success");
                  reloadTable();
                } else {
                  SweetAlert.swal("Failed", "Query Error", "error");
                  reloadTable();
                }
              },
              function (response) {
                if (response.status !== '200') {
                  SweetAlert.swal("Failed", "Connection to Server Error", "error");
                  reloadTable();
                }
              }
            );
          }
        }
      );
    }

    function editButton(id) {
      logger.log(id);
    }

    function reloadTable() {
      vm.dtInstance.changeData(adminGroupService.getGroupMenus($stateParams.id));
    }

    function tableActionButton(data) {
      // return '<button class="btn btn-warning" ng-click="vm.editButton(\'' + data.id + '\')"><i class="glyphicon glyphicon-edit"></i></button>' +
      //   '&nbsp;' +
      //   '<button class="btn btn-danger" ng-click="vm.deleteButton(\'' + data.id + '\', \'' + data.menu_name + '\')"><i class="glyphicon glyphicon-trash"></i></button>';
      return '<button class="btn btn-danger" ng-click="vm.deleteButton(\'' + data.id + '\', \'' + data.menu_name + '\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data, type, full) {
      return dataService.msToLocalDateTime(full.last_update);
    }

  }
})();
