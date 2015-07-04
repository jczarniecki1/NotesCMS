var SubjectTabs, setSubjectFromHash;

setSubjectFromHash = function(scope) {
  var currentHash, matchingHash, matchingItem, selectableItems;
  selectableItems = scope.items.slice(1);
  matchingHash = location.href.match(/#([^#]+)$/);
  currentHash = matchingHash != null ? matchingHash[1] : void 0;
  matchingItem = selectableItems.filter(function(x) {
    return x.name === currentHash;
  })[0];
  return scope.selected = matchingItem || {
    name: 'All',
    showAll: true
  };
};

SubjectTabs = (function() {
  function SubjectTabs() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'templates/SubjectTabs.html',
      scope: {
        selected: '=',
        items: '=',
        theme: '='
      },
      link: function(scope) {
        scope.select = function(item) {
          return scope.selected = item;
        };
        scope.addSubject = function() {
          var name;
          if (scope.newSubjectName.match(/^[a-z]+$/i)) {
            name = scope.newSubjectName.toUpperCase();
            scope.items.push({
              name: name
            });
            scope.newSubjectName = void 0;
            return setTimeout(function() {
              return $('#quick-add-subject-dialog').modal('toggle');
            });
          }
        };
        return setSubjectFromHash(scope);
      }
    };
  }

  return SubjectTabs;

})();

angular.module('app').directive('subjectTabs', [SubjectTabs]);
