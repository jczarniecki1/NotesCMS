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
        scope.goAddNote = function() {
          var newNote;
          newNote = {
            title: 'Untitled',
            subject: '???',
            subjectType: '???',
            createdDate: new Date(),
            flags: {
              owned: true,
              published: false,
              edit: true
            }
          };
          scope.allNotes.splice(0, 0, newNote);
          return scope.currentNote = newNote;
        };
        return scope.goStarred = function() {
          return scope.filterFavourites = !scope.filterFavourites;
        };
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
