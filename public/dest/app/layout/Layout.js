var Layout;

Layout = (function() {
  function Layout() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/html/Layout.html',
      link: function(scope, element) {
        return scope.invertColors = function() {
          scope.inverted = !scope.inverted;
          return localStorage.inverted = scope.inverted;
        };
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
