var App, AppConfig, AppInit;

App = (function() {
  function App() {
    return ['ngRoute', 'textAngular', 'angularjs.bootstrap.tagsinput.template', 'angularjs.bootstrap.tagsinput'];
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
  function AppInit($rootScope, taOptions) {
    $rootScope.inverted = localStorage.inverted === 'true';
    taOptions.toolbar = [['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'], ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'], ['html', 'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent', 'insertImage', 'insertLink']];
  }

  return AppInit;

})();

angular.module('app', new App()).config([AppConfig]).run(['$rootScope', 'taOptions', AppInit]);
