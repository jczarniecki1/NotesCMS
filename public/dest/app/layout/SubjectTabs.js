var SubjectTabs;

SubjectTabs = (function() {
  function SubjectTabs() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/SubjectTabs.html',
      scope: {
        selected: '='
      },
      link: function(scope) {
        return scope.select = function(item) {
          return scope.selected = item;
        };
      }
    };
  }

  return SubjectTabs;

})();

angular.module('app').directive('subjectTabs', [SubjectTabs]);
