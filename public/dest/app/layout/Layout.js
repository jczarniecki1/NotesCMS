var Layout;

Layout = (function() {
  function Layout() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/html/Layout.html',
      link: function(scope, element) {
        scope.invertColors = function() {
          scope.inverted = !scope.inverted;
          return localStorage.inverted = scope.inverted;
        };
        return scope.goAddNote = function() {
          var newNote;
          newNote = {
            title: 'Untitled',
            subject: '???',
            subjectType: '???',
            flags: {
              owned: true,
              published: false,
              edit: true
            }
          };
          scope.allNotes.push(newNote);
          return scope.currentNote = newNote;
        };
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
