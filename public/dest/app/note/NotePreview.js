var NotePreview;

NotePreview = (function() {
  function NotePreview() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/NotePreview.html',
      scope: {
        item: '='
      }
    };
  }

  return NotePreview;

})();

angular.module('app').directive('notePreview', [NotePreview]);
