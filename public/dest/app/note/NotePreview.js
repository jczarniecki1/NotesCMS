var NotePreview;

NotePreview = (function() {
  function NotePreview() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/NotePreview.html',
      scope: {
        item: '='
      },
      link: function(scope) {
        scope.requestMessage = 'Seem that this note is outdated...';
        scope.toggleDone = function(item) {
          return item.flags.done = !item.flags.done;
        };
        scope.toggleStarred = function(item) {
          return item.flags.starred = !item.flags.starred;
        };
        scope.togglePublished = function(item) {
          return item.flags.published = !item.flags.published;
        };
        return scope.showRequestDialog = function(item) {
          return scope.requestDialogVisible = true;
        };
      }
    };
  }

  return NotePreview;

})();

angular.module('app').directive('notePreview', [NotePreview]);
