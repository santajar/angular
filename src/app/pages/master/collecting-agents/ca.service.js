(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('CollectingAgentsService', CollectingAgentsService);

  /* @ngInject */
  function CollectingAgentsService(logger, Restangular, moment, TransformJsonProperyServices, AuthService) {

    /**
    * Variable Initiation
    */
    var ca = Restangular.all('collecting-agents');
    var service = {
      getCA: getCA,
      getCAs: getCAs,
      saveCA: saveCA,
      updateCA: updateCA,
      deleteCA: deleteCA
    };
    return service;

    ////////////////

    function getCA(id) {
      return ca.get(id).then(TransformResponse);
    }

    function getCAs() {
      return ca.getList().then(TransformResponse);
    }

    function saveCA(data) {
      var param = angular.copy(TransformJsonProperyServices.decamelizeKeys(data));
      param.last_user = AuthService.getUsername();
      param.register_user = AuthService.getUsername();
      return ca.post(angular.toJson(param)).then(TransformResponse);
    }

    function updateCA(data) {
      var param = angular.copy(TransformJsonProperyServices.decamelizeKeys(data));
      param.last_user = AuthService.getUsername();
      return ca.patch(angular.toJson(param)).then(TransformResponse);
    }

    function deleteCA(id) {
      return ca.one(id).remove().then(TransformResponse);
    }

    ////////////////////////////

    function TransformResponse(response) {
      var generated = response.plain();
      response = TransformJsonProperyServices.camelizeKeys(generated);
      return response;
    }

  }
})();
