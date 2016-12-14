(function () {
  'use strict';

  angular
    .module('BlurAdmin')
    .config(RestangularConfig);

  function RestangularConfig(RestangularProvider, config) {
    /**
     * Restangular Base URL Config
     */
    RestangularProvider.setBaseUrl(config.url);
    
    /**
     * Restangular Response Interceptor
     */
    RestangularProvider.addResponseInterceptor(function (data, operation) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.list;
        extractedData.error = data.error;
        extractedData.paging = data.paging;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
  }

})();
