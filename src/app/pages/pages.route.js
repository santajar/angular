(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .config(IndexRoute);

  /** @ngInject */
  function IndexRoute($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('app/dashboard');
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "app/pages/user/user-login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("app", {
        abstract: true,
        url: "/app",
        templateUrl: "app/pages/layout/layout.html"
      })
      .state("dashboard", {
        parent: 'app',
        url: "/dashboard",
        templateUrl: "app/pages/dashboard/dashboard.html",
        controller: "DashboardController",
        controllerAs: "vm",
        title: 'Dashboard',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      })
      .state("shipment", {
        parent: 'app',
        url: "/shipment",
        templateUrl: "app/pages/shipment/shipment.html",
        controller: "ShipmentController",
        controllerAs: "vm",
        title: 'Shipments',
        sidebarMeta: {
          icon: 'ion-android-pin',
          order: 0,
        },
      })
      .state("Inquiry", {
        parent: 'app',
        url: "/shipment",
        templateUrl: "app/pages/shipment/shipment.html",
        controller: "ShipmentController",
        controllerAs: "vm",
        title: 'Inquiry',
        sidebarMeta: {
          icon: 'ion-card',
          order: 0,
        },
      })
      .state("Billing", {
        parent: 'app',
        url: "/Billing",
        templateUrl: "app/pages/shipment/shipment.html",
        controller: "ShipmentController",
        controllerAs: "vm",
        title: 'Billing',
        sidebarMeta: {
          icon: 'ion-cash',
          order: 0,
        },
      })
      .state("Report", {
        parent: 'app',
        url: "/Billing",
        templateUrl: "app/pages/shipment/shipment.html",
        controller: "ShipmentController",
        controllerAs: "vm",
        title: 'Report',
        sidebarMeta: {
          icon: 'ion-printer',
          order: 0,
        },
      })
      .state("Setting", {
        parent: 'app',
        url: "/setting",
        templateUrl: "app/pages/shipment/shipment.html",
        controller: "ShipmentController",
        controllerAs: "vm",
        title: 'Setting',
        sidebarMeta: {
          icon: 'ion-android-settings',
          order: 0,
        },
      })
      ;
  }

})();
