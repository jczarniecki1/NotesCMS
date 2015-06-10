var NoteList, fakeNote, getParagraph, randomIndex, subjects, types, words;

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
    starred: false,
    flags: {
      readLater: false,
      done: false,
      owned: randomIndex() % 2 === 0
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

NoteList = (function() {
  function NoteList() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/NoteList.html',
      scope: {
        items: '=',
        selected: '=',
        subject: '=',
        filterFavourites: '='
      },
      link: function(scope) {
        scope.items = [fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote(), fakeNote()];
        scope.select = function(item) {
          return scope.selected = item;
        };
        return scope.itemsFilter = function(item) {
          console.log(scope.filterFavourites);
          if (scope.filterFavourites && !item.starred) {
            return false;
          }
          if ((scope.subject != null) && !scope.subject.showAll) {
            return item.subject === scope.subject.name || item.flags.edit;
          } else {
            return true;
          }
        };
      }
    };
  }

  return NoteList;

})();

angular.module('app').directive('noteList', [NoteList]);
