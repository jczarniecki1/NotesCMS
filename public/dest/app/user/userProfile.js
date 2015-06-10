var UserProfile;

UserProfile = (function() {
  function UserProfile() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/UserProfile.html',
      scope: {
        user: "="
      },
      link: function(scope) {
        var subjects;
        subjects = JSON.parse(localStorage.subjects).map(function(x) {
          return x.name;
        }).slice(1);
        return scope.subjectsTags = {
          tagsinputId: '$$$',
          initTags: subjects,
          maxTags: 10,
          maxLength: 15
        };
      }
    };
  }

  return UserProfile;

})();

angular.module('app').directive('userProfile', [UserProfile]);
