/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular
    .module('BlurAdmin.theme.components')
    .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop(SweetAlert, AuthService, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: linkFunc
    };

    function linkFunc(scope, elem, attr) {
      scope.logout = logout;

      function logout() {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You will be Logged Out!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Log Out!",
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
          },
          function (isConfirm) {
            if (isConfirm) {
              $timeout(destroyCredentials, 1000);
            }
          }
        );

        function destroyCredentials() {
          AuthService.destroyCredentials();
          SweetAlert.swal("Logged Out!", "You've been Logged Out", "success");
        }
      }
    }

  }

})();
