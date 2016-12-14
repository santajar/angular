(function () {
  'use strict';

  angular
    .module('BlurAdmin')
    .config(config);

  function config($logProvider, toastrConfig, $urlRouterProvider, RestangularProvider, uiSelectConfig) {
    /**
     * Log Config
     */
    $logProvider.debugEnabled(true);

    /**
     * Toastr Config
     */
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    /**
     * UI-Router fallback route
     */
    // $urlRouterProvider.otherwise('/login');

  }

})();
