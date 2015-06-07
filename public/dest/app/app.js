var App, AppConfig;

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

angular.module('app', new App()).config([AppConfig]);
