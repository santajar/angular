(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('TransformJsonProperyServices', TransformJsonProperyServices);

  // TransformJsonProperyServices.$inject = [''];

  /* @ngInject */
  function TransformJsonProperyServices() {
    var service = {
      camelizeKeys: camelizeKeys,
      decamelizeKeys: decamelizeKeys
    };

    return service;

    function camelizeKeys(list) {
      var data = angular.copy(list);
      if (angular.isArray(data)) {
        angular.forEach(data, function (row, index) {
          angular.forEach(row, function (value, key) {
            var camelCase = camelize(key);
            data[index][camelCase] = data[index][key];
            if (camelCase !== key) {
              delete data[index][key];
            }
          });
        });
      } else {
        angular.forEach(data, function (value, key) {
          var camelCase = camelize(key);
          data[camelCase] = data[key];
          if (camelCase !== key) {
            delete data[key];
          }
        });
      }

      return data;
    }

    function decamelizeKeys(obj) {
      var data = angular.copy(obj);
      angular.forEach(data, function (value, key) {
        var underScore = decamelize(key);
        data[underScore] = data[key];
        if (underScore !== key) {
          delete data[key];
        }
      });
      return data;
    }

    function camelize(str) {
      if (_isNumerical(str)) {
        return str;
      }
      str = str.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      return str.substr(0, 1).toLowerCase() + str.substr(1);
    }

    function decamelize(str) {
      return separateWords(str).toLowerCase();
    }

    function separateWords(str) {
      var split = /(?=[A-Z])/;
      var separator = '_';
      return str.split(split).join(separator);
    }

    function _isNumerical(obj) {
      obj = obj - 0;
      return obj === obj;
    }
  }
})();
