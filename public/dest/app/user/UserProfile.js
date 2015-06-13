var UserProfile, allColors;

allColors = [];

allColors.refresh = function() {};

$(function() {
  return $.when($.get("/vendor/bootstrap-material-design/dist/css/material-fullpalette.min.css")).done(function(response) {
    [].splice.apply(allColors, [0, 0].concat((function() {
      var _all;
      _all = response.match(/.mdi-material-[a-z\-0-9]+,/g).map(function(x) {
        return x.match(/.mdi-material-([a-z\-0-9]+),/)[1];
      });
      return _all.filter(function(x, i) {
        return i === _all.lastIndexOf(x);
      });
    })()));
    try {
      return allColors.refresh();
    } catch (_error) {}
  });
});

UserProfile = (function() {
  function UserProfile() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/UserProfile.html',
      scope: {
        user: '='
      },
      link: function(scope) {
        var subjects;
        subjects = scope.user.subjects.map(function(x) {
          return x.name;
        });
        scope.subjectsTags = {
          tagsinputId: '$$$',
          initTags: subjects,
          maxTags: 10,
          maxLength: 15
        };
        scope.onSubjectsChange = function(data) {
          scope.user.subjects = data.tags.map(function(x) {
            return {
              name: x
            };
          });
          return localStorage.subjects = JSON.stringify(scope.user.subjects);
        };
        scope.colors = ['teal', 'red', 'green', 'blue'];
        allColors.refresh = function() {
          return scope.$apply();
        };
        scope.colors = allColors;
        return scope.selectTheme = function(color) {
          return localStorage.theme = scope.user.theme = color;
        };
      }
    };
  }

  return UserProfile;

})();

angular.module('app').directive('userProfile', [UserProfile]);
