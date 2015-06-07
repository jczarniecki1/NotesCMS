var SubjectTabs, defaultSubjects;

defaultSubjects = [
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
        var saveSubjects;
        saveSubjects = function() {
          return localStorage.subjects = angular.toJson(scope.items);
        };
        scope.select = function(item) {
          return scope.selected = item;
        };
        if (localStorage.subjects) {
          scope.items = JSON.parse(localStorage.subjects);
        } else {
          scope.items = defaultSubjects;
          saveSubjects();
        }
        return scope.addSubject = function() {
          var name;
          console.log("addSubject: [" + scope.newSubjectName + "]");
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
      }
    };
  }

  return SubjectTabs;

})();

angular.module('app').directive('subjectTabs', [SubjectTabs]);
