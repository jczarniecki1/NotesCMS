var Layout, fakeUser;

fakeUser = function() {
  return {
    username: 'John Doe',
    group: '2015_online_db',
    enabled: true
  };
};

Layout = (function() {
  function Layout() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/html/Layout.html',
      link: function(scope, element) {
        var currentHash, ref;
        scope.invertColors = function() {
          scope.inverted = !scope.inverted;
          return localStorage.inverted = scope.inverted;
        };
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
            return history.back();
          }
        };
        scope.gotoBookmarks = function() {
          scope.filterFavourites = false;
          scope.showUserProfile = false;
          scope.filterBookmarks = !scope.filterBookmarks;
          if (scope.filterBookmarks) {
            return history.pushState({}, 'Bookmarks', '/#Bookmarks');
          } else {
            return history.back();
          }
        };
        scope.gotoUserProfile = function() {
          scope.filterBookmarks = false;
          scope.filterFavourites = false;
          scope.showUserProfile = !scope.showUserProfile;
          if (scope.showUserProfile) {
            return history.pushState({}, 'User Profile', '/#Profile');
          } else {
            return history.back();
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
        return scope.user = fakeUser();
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
