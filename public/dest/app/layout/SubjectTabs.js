var SubjectTabs, defaultSubjects, setSubjectFromHash;

defaultSubjects = [
  {
    name: 'All',
    showAll: true
  }, {
    name: 'ELE'
  }, {
    name: 'SEM2'
  }, {
    name: 'ZPR'
  }, {
    name: 'TBO'
  }
];

setSubjectFromHash = function(scope) {
  var currentHash, matchingHash, matchingItem, selectableItems;
  selectableItems = scope.items.slice(1);
  matchingHash = location.href.match(/#([^#]+)$/);
  currentHash = matchingHash != null ? matchingHash[1] : void 0;
  matchingItem = selectableItems.filter(function(x) {
    return x.name === currentHash;
  })[0];
  return scope.selected = matchingItem || scope.items[0];
};

SubjectTabs = (function() {
  function SubjectTabs() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/SubjectTabs.html',
      scope: {
        selected: '=',
        theme: '='
      },
      link: function(scope) {
        var saveSubjects;
        saveSubjects = function() {
          return localStorage.subjects = angular.toJson(scope.items);
        };
        scope.select = function(item) {
          return scope.selected = item;
        };
        if (localStorage.subjects) {
          scope.items = JSON.parse(localStorage.subjects);
          if (scope.items.filter(function(x) {
            return x.showAll;
          }).length === 0) {
            scope.items = defaultSubjects;
            saveSubjects();
          }
        } else {
          scope.items = defaultSubjects;
          saveSubjects();
        }
        scope.addSubject = function() {
          var name;
          if (scope.newSubjectName.match(/^[a-z]+$/i)) {
            name = scope.newSubjectName.toUpperCase();
            scope.items.push({
              name: name
            });
            saveSubjects();
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
