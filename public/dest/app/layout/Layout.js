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
        scope.goStarred = function() {
          scope.filterFavourites = !scope.filterFavourites;
          return scope.filterBookmarks = false;
        };
        return scope.goReadLater = function() {
          scope.filterBookmarks = !scope.filterBookmarks;
          return scope.filterFavourites = false;
        };
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
