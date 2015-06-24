var Layout, defaultFontFamily, defaultSubjects, fakeUser, fontFamilyOptions;

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

fontFamilyOptions = [
  {
    name: 'Roboto',
    value: "RobotoDraft,Roboto,Arial,sans-serif"
  }, {
    name: 'Helvetica',
    value: "Helvetica Neue,Helvetica,Arial,sans-serif"
  }, {
    name: 'Palatino',
    value: "Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif"
  }, {
    name: 'Calibri',
    value: "Calibri Light,Calibri,sans-serif"
  }, {
    name: 'Candara',
    value: "Candara,sans-serif"
  }
];

defaultFontFamily = 0;

fakeUser = function() {
  return {
    username: 'John Doe',
    group: '2015_online_db',
    enabled: true,
    theme: localStorage.theme || 'primary'
  };
};

Layout = (function() {
  function Layout(noteFactoryService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/Layout.html',
      link: function(scope, element) {
        var currentHash, ref;
        scope.invertColors = function() {
          scope.inverted = !scope.inverted;
          return localStorage.inverted = scope.inverted;
        };
        scope.allNotes = JSON.parse(localStorage.allNotes || "[]") || [noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote(), noteFactoryService.fakeNote()];
        scope.$watch('allNotes', function() {
          return localStorage.allNotes = angular.toJson(scope.allNotes);
        }, true);
        scope.createNewNote = function() {
          var newNote;
          newNote = {
            title: 'Untitled',
            subject: '???',
            subjectType: '???',
            createdDate: new Date(),
            flags: {
              owned: true,
              published: false,
              edit: true
            }
          };
          scope.allNotes.push(newNote);
          return scope.currentNote = newNote;
        };
        scope.gotoStarred = function() {
          scope.filterBookmarks = false;
          scope.showUserProfile = false;
          scope.filterFavourites = !scope.filterFavourites;
          if (scope.filterFavourites) {
            return history.pushState({}, 'Favourites', '/#Favourites');
          } else {
            return history.pushState({}, 'Index', '/');
          }
        };
        scope.gotoBookmarks = function() {
          scope.filterFavourites = false;
          scope.showUserProfile = false;
          scope.filterBookmarks = !scope.filterBookmarks;
          if (scope.filterBookmarks) {
            return history.pushState({}, 'Bookmarks', '/#Bookmarks');
          } else {
            return history.pushState({}, 'Index', '/');
          }
        };
        scope.gotoUserProfile = function() {
          scope.filterBookmarks = false;
          scope.filterFavourites = false;
          scope.showUserProfile = !scope.showUserProfile;
          if (scope.showUserProfile) {
            return history.pushState({}, 'User Profile', '/#Profile');
          } else {
            return history.pushState({}, 'Index', '/');
          }
        };
        currentHash = (ref = location.href.match(/#([^#]+)$/)) != null ? ref[1] : void 0;
        if (currentHash === 'Profile') {
          scope.showUserProfile = true;
        }
        if (currentHash === 'Favourites') {
          scope.filterFavourites = true;
        }
        if (currentHash === 'Bookmarks') {
          scope.filterBookmarks = true;
        }
        scope.user = fakeUser();
        scope.$watch('user.subject', function() {
          return localStorage.subjects = angular.toJson(scope.user.subjects);
        });
        if (localStorage.subjects) {
          scope.user.subjects = JSON.parse(localStorage.subjects);
        } else {
          scope.user.subjects = defaultSubjects;
        }
        scope.$watch('user.fontFamily', function() {
          if (scope.user.fontFamily == null) {
            return;
          }
          localStorage.fontFamily = scope.user.fontFamily;
          return document.styleSheets[0].addRule('body, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4', "font-family: " + fontFamilyOptions[scope.user.fontFamily].value + " !important;");
        });
        if (localStorage.fontFamily) {
          return scope.user.fontFamily = JSON.parse(localStorage.fontFamily);
        } else {
          return scope.user.fontFamily = 1;
        }
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', ['noteFactoryService', Layout]);
