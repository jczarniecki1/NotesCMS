var NotePreview;

NotePreview = (function() {
  function NotePreview() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/NotePreview.html',
      scope: {
        items: '=',
        item: '='
      },
      link: function(scope) {
        scope.requestMessage = 'Seem that this note is outdated...';
        scope.toggleDone = function(item) {
          return item.flags.done = !item.flags.done;
        };
        scope.toggleStarred = function(item) {
          item.starredDate = !item.starredDate ? new Date() : void 0;
          item.starredOrderValue = item.starredDate ? Number.MAX_SAFE_INTEGER - item.starredDate : void 0;
          return item.flags.starred = item.starredDate != null;
        };
        scope.togglePublished = function(item) {
          return item.flags.published = !item.flags.published;
        };
        scope.toggleReadLater = function(item) {
          return item.flags.readLater = !item.flags.readLater;
        };
        scope.removeCurrentItem = function() {
          var index, nextIndex;
          index = scope.items.indexOf(scope.item);
          scope.items.splice(index, 1);
          nextIndex = index < scope.items.length ? index : index - 1;
          scope.item = scope.items[nextIndex];
          return setTimeout(function() {
            return $('#remove-dialog').modal('toggle');
          });
        };
        return scope.toggleEditMode = function(item) {
          return item.flags.edit = !item.flags.edit;
        };
      }
    };
  }

  return NotePreview;

})();

angular.module('app').directive('notePreview', [NotePreview]);
