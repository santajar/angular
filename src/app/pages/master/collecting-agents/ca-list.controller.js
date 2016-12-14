(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterCollectingAgentsListController', MasterCollectingAgentsListController);

  /* @ngInject */
  function MasterCollectingAgentsListController(logger, SweetAlert, CollectingAgentsService, moment, $uibModal, DTOptionsBuilder, DTColumnBuilder, $state, $compile, $scope) {
    var vm = this;

    /**
     * Variable Initiation
     */
    vm.cas = [];
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
      vm.dtOptions = DTOptionsBuilder.fromFnPromise(CollectingAgentsService.getCAs)
        .withPaginationType('full_numbers')
        .withOption('createdRow', tableCreatedRow)
        .withOption('order', [0, 'asc'])
        .withButtons([{
          text: 'ADD CA',
          key: 1,
          action: btnAdd
        }]);
      vm.dtColumns = [
        DTColumnBuilder.newColumn('caCode').withTitle('KODE CA'),
        DTColumnBuilder.newColumn('caName').withTitle('NAMA CA'),
        // DTColumnBuilder.newColumn('bankCode').withTitle('KODE BANK'),
        DTColumnBuilder.newColumn('lastUser').withTitle('LAST USER'),
        DTColumnBuilder.newColumn('lastUpdate').withTitle('LAST UPDATE').renderWith(tableConvertDateTime),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(tableActionButton)
      ];
    }

    function btnAdd() {
      var modalAdd = $uibModal.open({
        templateUrl: 'app/pages/master/collecting-agents/form-ca.html',
        controller: 'MasterCollectingAgentsAddController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          banks: resolveBANKS
        }
      });

      modalAdd.result.then(resultModal);

    }

    function btnDelete(id) {
      var modalDelete = $uibModal.open({
        templateUrl: 'app/pages/master/collecting-agents/form-ca.html',
        controller: 'MasterCollectingAgentsDeleteController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          banks: resolveBANKS,
          ca: resolveCA(id)
        }
      });

      modalDelete.result.then(resultModal);
    }

    function btnEdit(id) {
      var modalEdit = $uibModal.open({
        templateUrl: 'app/pages/master/collecting-agents/form-ca.html',
        controller: 'MasterCollectingAgentsEditController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          banks: resolveBANKS,
          ca: resolveCA(id)
        }
      });

      modalEdit.result.then(resultModal);
    }

    function reloadTable() {
      vm.dtInstance.reloadData();
    }

    function resolveCA(id) {
      return function (CollectingAgentsService) {
        return CollectingAgentsService.getCA(id);
      }
    }

    function resolveBANKS(BanksService) {
      return BanksService.getBanks();
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
      return '<button class="btn btn-warning" ng-click="vm.btnEdit(\''+data.caCode+'\')"><i class="glyphicon glyphicon-edit"></i></button>' +
        '&nbsp;' +
        '<button class="btn btn-danger" ng-click="vm.btnDelete(\''+data.caCode+'\')"><i class="glyphicon glyphicon-trash"></i></button>';
    }

    function tableCreatedRow(row) {
      $compile(angular.element(row).contents())($scope);
    }

    function tableConvertDateTime(data) {
      return moment(data).format('DD-MM-YYYY');
    }

  }
})();
