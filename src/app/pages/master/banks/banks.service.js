(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('BanksService', BanksService);

  /* @ngInject */
  function BanksService(Restangular, moment, TransformJsonProperyServices, logger, AuthService) {
    var banks = Restangular.all('banks');
    var service = {
      getBank: getBank,
      getBanks: getBanks,
      saveBank: saveBank,
      updateBank: updateBank,
      deleteBank: deleteBank
    };
    return service;

    ////////////////

    function getBank(id) {
      return banks.get(id).then(TransformResponse);
    }

    function getBanks() {
      return banks.getList().then(TransformResponse);
    }

    function saveBank(data) {
      var param = angular.copy(TransformJsonProperyServices.decamelizeKeys(data));
      param.last_user = AuthService.getUsername();
      return banks.post(angular.toJson(param)).then(TransformResponse);
    }

    function updateBank(data) {
      var param = angular.copy(TransformJsonProperyServices.decamelizeKeys(data));
      param.last_user = AuthService.getUsername();
      return banks.patch(angular.toJson(param)).then(TransformResponse);
    }

    function deleteBank(id) {
      return banks.one(id).remove().then(TransformResponse);
    }

    ////////////////////////////

    function TransformResponse(response) {
      var generated = response.plain();
      response = TransformJsonProperyServices.camelizeKeys(generated);
      return response;
    }

  }
})();
