var UserProfile, allColors;

allColors = [];

allColors.refresh = function() {};

$(function() {
  return $.when($.get("/vendor/bootstrap-material-design/dist/css/material.min.css")).done(function(response) {
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
      templateUrl: 'templates/UserProfile.html',
      scope: {
        user: '='
      },
      link: function(scope) {
        var options, subjects;
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
        options = {};
        fontFamilyOptions.forEach(function(x, i) {
          return options[x.name] = i;
        });
        scope.fontFamilyOptions = options;
        setTimeout(function() {
          return $('.select').dropdown({
            optionClass: 'withripple',
            callback: function() {
              var $d;
              $d = $('.dropdownjs');
              $d.find('.fakeinput').val(fontFamilyOptions[scope.user.fontFamily].name);
              $d.find('li').removeClass('selected');
              return $d.find("[value='number:" + scope.user.fontFamily + "']").addClass('selected');
            }
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
