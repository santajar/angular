/* global moment:false */
(function () {
  'use strict';

  angular
    .module('BlurAdmin')
    .constant('moment', moment)
    .constant('config', {
      //url: 'http://103.31.225.204:8989/fujiseat/'     //REST.API@SERVER-PUBLIC.IP
      url: 'http://10.30.11.15:3000/api'
    });
})();
