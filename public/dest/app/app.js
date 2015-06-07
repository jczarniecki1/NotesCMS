var App, AppConfig, AppInit;

App = (function() {
  function App() {
    return ['ngRoute'];
  }

  return App;

})();

AppConfig = (function() {
  function AppConfig() {
    ErrorHandling.Message('Loading timeout', 'Initialization takes longer than expected...').ShowAfter(3500);
    $.material.init();
  }

  return AppConfig;

})();

AppInit = (function() {
  function AppInit($rootScope) {
    $rootScope.inverted = localStorage.inverted === 'true';
  }

  return AppInit;

})();

angular.module('app', new App()).config([AppConfig]).run(['$rootScope', AppInit]);
