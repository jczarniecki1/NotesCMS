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
        scope.select = function(item) {
          return scope.selected = item;
        };
        return scope.items = [
          {
            name: 'ELE'
          }, {
            name: 'SEM2'
          }, {
            name: 'ZPR'
          }, {
            name: 'TBO'
          }
        ];
      }
    };
  }

  return SubjectTabs;

})();

angular.module('app').directive('subjectTabs', [SubjectTabs]);
