var NoteList;

NoteList = (function() {
  function NoteList() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'templates/NoteList.html',
      scope: {
        items: '=',
        selected: '=',
        subject: '=',
        filterFavourites: '=',
        filterBookmarks: '=',
        showUserNotes: '='
      },
      link: function(scope) {
        scope.select = function(item) {
          return scope.selected = item;
        };
        return scope.itemsFilter = function(item) {
          if (item.flags.edit) {
            return true;
          }
          if (scope.filterFavourites && !item.flags.starred) {
            return false;
          }
          if (scope.filterBookmarks && !item.flags.readLater) {
            return false;
          }
          if ((!scope.showUserNotes) && item.flags.owned) {
            return false;
          }
          if ((scope.subject != null) && !scope.subject.showAll) {
            return item.subject === scope.subject.name;
          } else {
            return true;
          }
        };
      }
    };
  }

  return NoteList;

})();

angular.module('app').directive('noteList', [NoteList]);
