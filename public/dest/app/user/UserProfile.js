var UserProfile;

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
        subjects = JSON.parse(localStorage.subjects).map(function(x) {
          return x.name;
        }).slice(1);
        scope.subjectsTags = {
          tagsinputId: '$$$',
          initTags: subjects,
          maxTags: 10,
          maxLength: 15
        };
        scope.colors = ['teal', 'light-blue-300', 'green-100', 'red'];
        $(function() {
          return $.when($.get("/vendor/bootstrap-material-design/dist/css/material-fullpalette.min.css")).done(function(response) {
            var allColors;
            allColors = response.match(/.mdi-material-[a-z\-0-9]+,/g).map(function(x) {
              return x.match(/.mdi-material-([a-z\-0-9]+),/)[1];
            });
            scope.colors = allColors.filter(function(x, i) {
              return i === allColors.lastIndexOf(x);
            });
            return scope.$apply();
          });
        });
        return scope.selectTheme = function(color) {
          return localStorage.theme = scope.user.theme = color;
        };
      }
    };
  }

  return UserProfile;

})();

angular.module('app').directive('userProfile', [UserProfile]);
