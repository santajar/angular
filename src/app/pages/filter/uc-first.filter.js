(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .filter('ucFirst', ucFirst);

    function ucFirst() {
        return ucFirstFilter;

        function ucFirstFilter(s) {
            return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
        }
    }
})();
