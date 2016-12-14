(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .factory('AuthService', AuthService);

  function AuthService(md5, Restangular, $state, logger) {
    var login = Restangular.all('Login');
    var chpass = Restangular.all('userChangePassword');
    var defaultCred = {
      loggedin: false
    };
    var cred = {
      loggedin: true,
      id: '129381903673214',
      password: '',
      username: 'seolhyun',
      name: 'seolhyun',
      email: 'seolhyun@aoa.co.kr',
      group: '19287912834783294'
    };

    var service = {
      auth: auth,
      changePassword: changePassword,
      checkPassword: checkPassword,
      destroyCredentials: destroyCredentials,
      getAuth: getAuth,
      getMenusCredentials: getMenusCredentials,
      getUsername: getUsername
    };
    return service;

    ////////////////
    function auth(username, password) {
      return login.post(angular.toJson({
        username: username,
        password: md5.createHash(password)
      })).then(
        function (response) {
          response = response.plain();
          if (response.rc !== '00') {
            cred.loggedin = false;
            cred.username = '';
            return false;
          } else {
            setCredentials(response.list[0]);
            return true;
          }
        }
      );
    }

    function changePassword(data) {
      var tempData = angular.copy(data);
      var password = md5.createHash(tempData.passwordBaru);
      var passwordlama = md5.createHash(tempData.passwordLama);
      var param = {
        id: cred.id,
        password: password,
        passwordlama: passwordlama,
      };
      return chpass.post(angular.toJson(param)).then(function (response) {
        cred.password = password;
        return response.plain();
      });
    }

    function checkPassword(pwd) {
      if (md5.createHash(pwd) === cred.password) {
        return true;
      } else {
        return false;
      }
    }

    function destroyCredentials() {
      angular.copy(defaultCred, cred);
      $state.go("login");
    }

    function getAuth() {
      return cred.loggedin;
    }

    function getMenusCredentials() {
      var menusCredentials = {
        username: cred.username,
        password: cred.password,
        id: cred.group
      };
      return menusCredentials;
    }

    function getUsername() {
      return cred.username;
    }

    function setCredentials(data) {
      cred.loggedin = true;
      cred.username = data.username;
      cred.name = data.name;
      cred.password = data.password;
      cred.email = data.email;
      cred.id = data.id;
      cred.group = data.id_m_group;
    }

  }
})();
