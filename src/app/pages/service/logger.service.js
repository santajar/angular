(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .factory('logger', logger);

    /* @ngInject */
    function logger($log) {
        var service = {
            log: log,
            info: info,
            warn: warn,
            error: error,
            debug: debug
        };

        return service;

        function log(msg) {
          $log.log(msg);
        }

        function info(msg) {
          $log.info(msg);
        }

        function warn(msg) {
          $log.warn(msg);
        }

        function error(msg) {
          $log.error(msg);
        }

        function debug(msg) {
          $log.debug(msg);
        }

    }
})();
