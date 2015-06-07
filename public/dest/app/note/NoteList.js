var NoteList, fakeNote, randomIndex, subjects, types, words;

randomIndex = function() {
  return Math.floor(Math.random() * 9.9);
};

words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming'];

subjects = ['JPA', 'TBD', 'TSA', 'IAB', 'ELE', 'GUI', 'ABC', 'KOR', 'ZAP', 'JFA'];

types = ['Project', 'Lecture', 'Exam', 'Exercises'];

fakeNote = function() {
  var i, results;
  window.__lastId || (window.__lastId = 1);
  return {
    id: window.__lastId++,
    title: [1, 2, 3, 4, 5].map(function() {
      return words[randomIndex()];
    }).join(' '),
    subject: subjects[randomIndex()],
    subjectType: types[randomIndex() % 4],
    content: 'Lorem ipsum... ' + (function() {
      results = [];
      for (i = 1; i <= 125; i++){ results.push(i); }
      return results;
    }).apply(this).map(function() {
      return words[randomIndex()];
    }).join(' '),
    created: '2015-02-23',
    updated: '2015-03-11',
    flags: {
      readLater: false,
      done: false,
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

NoteList = (function() {
  function NoteList() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/html/NoteList.html',
      scope: {
        selected: '='
      },
      link: function(scope) {
        scope.items = [fakeNote(), fakeNote(), fakeNote(), fakeNote()];
        return scope.select = function(item) {
          return scope.selected = item;
        };
      }
    };
  }

  return NoteList;

})();

angular.module('app').directive('noteList', [NoteList]);
