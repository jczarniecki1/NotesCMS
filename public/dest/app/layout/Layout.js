var Layout, defaultSubjects, fakeNote, fakeUser, getParagraph, randomIndex, subjects, types, words;

fakeUser = function() {
  return {
    username: 'John Doe',
    group: '2015_online_db',
    enabled: true,
    theme: localStorage.theme || 'primary'
  };
};

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

randomIndex = function() {
  return Math.floor(Math.random() * 9.9);
};

words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming'];

getParagraph = function() {
  var i, results;
  return (function() {
    results = [];
    for (i = 1; i <= 125; i++){ results.push(i); }
    return results;
  }).apply(this).map(function() {
    return words[randomIndex()];
  }).join(' ').replace(/work/, '<strong>work</strong>').replace(/programming/, '<span style="color: blue;">programming</span>');
};

subjects = ['JPA', 'TBO', 'TSA', 'IAB', 'ELE', 'KOR', 'ZPR', 'SEM2'];

types = ['Project', 'Lecture', 'Exam', 'Exercises'];

fakeNote = function() {
  window.__lastId || (window.__lastId = 1);
  return {
    id: window.__lastId++,
    title: [1, 2, 3, 4, 5].map(function() {
      return words[randomIndex()];
    }).join(' '),
    subject: subjects[randomIndex() % 8],
    subjectType: types[randomIndex() % 4],
    content: '<h4>Lorem ipsum...</h4>' + ("<p>" + (getParagraph()) + "<p>") + ("<p>" + (getParagraph()) + "<p>"),
    createdDate: new Date(),
    flags: {
      readLater: false,
      done: false,
      owned: randomIndex() % 2 === 0,
      starred: false
    },
    author: {
      username: 'John Doe',
      group: '2015_online_db',
      notesCounter: 21,
      awardsCounter: 2,
      enabled: true
    }
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
        scope.allNotes = [fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote()];
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
        scope.$watch('users.subject', function() {
          return localStorage.subjects = angular.toJson(scope.user.subjects);
        });
        if (localStorage.subjects) {
          return scope.user.subjects = JSON.parse(localStorage.subjects);
        } else {
          return scope.user.subjects = defaultSubjects;
        }
      }
    };
  }

  return Layout;

})();

angular.module('app').directive('layout', [Layout]);
