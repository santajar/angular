(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterBanksListController', MasterBanksListController);

  /* @ngInject */
  function MasterBanksListController(SweetAlert, moment, $uibModal, DTOptionsBuilder, DTColumnBuilder, $state, $compile, $scope, logger, BanksService) {
    var vm = this;

    /**
     * Variable Initiation
     */
    vm.banks = [];
    vm.dtInstance = {};

    /**
     * Function Declaration
     */
    vm.btnDelete = btnDelete;
    vm.btnEdit = btnEdit;

    ////////////////

    activate();

    ////////////////

    function activate() {
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(BanksService.getBanks)
        .withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [0, 'asc'])
        .withButtons([{
          text: 'ADD BANKS',
          key: 1,
          action: btnAdd
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('bankId').withTitle('ID BANK'),
        DTColumnBuilder.newColumn('name').withTitle('NAMA BANK'),
        DTColumnBuilder.newColumn('bankCode').withTitle('KODE BANK'),
        DTColumnBuilder.newColumn('lastUser').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function btnAdd() {
      var modalAdd = $uibModal.open({
        templateUrl: 'app/pages/master/banks/form-banks.html',
        controller: 'MasterBanksAddController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg'
      });

      modalAdd.result.then(resultModal);
    }

    function btnDelete(id) {
      var modalDelete = $uibModal.open({
        templateUrl: 'app/pages/master/banks/form-banks.html',
        controller: 'MasterBanksDeleteController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          bank: ['BanksService', function (BanksService) {
            return BanksService.getBank(id).then(function (response) {
              return response;
            });
          }]
        }
      });

      modalDelete.result.then(resultModal);
    }

    function btnEdit(id) {
      var modalEdit = $uibModal.open({
        templateUrl: 'app/pages/master/banks/form-banks.html',
        controller: 'MasterBanksEditController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          bank: ['BanksService', function (BanksService) {
            return BanksService.getBank(id).then(function (response) {
              return response;
            });
          }]
        }
      });

      modalEdit.result.then(resultModal);
    }

    function reloadTable() {
      vm.dtInstance.reloadData();
    }

    function resultAlert(val) {
      if (val.status) {
          SweetAlert.swal("Berhasil", val.msg, "success");
        } else {
          SweetAlert.swal("Gagal", val.msg, "error");
      }
    }

    function resultModal(val) {
      resultAlert(val);
      reloadTable();
    }

    function tableActionButton(data) {
      return '<button class="btn btn-warning" ng-click="vm.btnEdit(\''+data.bankId+'\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="vm.btnDelete(\''+data.bankId+'\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data) {
      return moment(data).format('DD-MM-YYYY');
    }

  }
})();
