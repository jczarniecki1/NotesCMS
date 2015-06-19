var Note, NoteFactory, randomIndex, subjects, types;

subjects = ['JPA', 'TBO', 'TSA', 'IAB', 'ELE', 'KOR', 'ZPR', 'SEM2'];

types = ['Project', 'Lecture', 'Exam', 'Exercises'];

randomIndex = function() {
  return Math.floor(Math.random() * 9.9);
};

Note = (function() {
  function Note(noteDate) {
    var key, value;
    for (key in noteDate) {
      value = noteDate[key];
      this[key] = value;
    }
  }

  return Note;

})();

NoteFactory = (function() {
  var _lastId, fakeUser;

  _lastId = 0;

  function NoteFactory(noteContentGeneratorService) {
    this.noteContentGeneratorService = noteContentGeneratorService;
  }

  NoteFactory.prototype.fakeNote = function() {
    return new Note({
      id: ++_lastId,
      title: this.getFakeTitle(),
      subject: subjects[randomIndex() % 8],
      subjectType: types[randomIndex() % 4],
      content: this.getFakeContent(),
      createdDate: new Date(),
      flags: {
        readLater: false,
        done: false,
        owned: randomIndex() % 2 === 0,
        starred: false
      },
      author: fakeUser
    });
  };

  NoteFactory.prototype.getFakeTitle = function() {
    if (_lastId === 1) {
      return 'High Performance Browser Networking';
    } else {
      return [1, 2, 3, 4, 5].map(function() {
        return words[randomIndex()];
      }).join(' ');
    }
  };

  NoteFactory.prototype.getFakeContent = function() {
    if (_lastId === 1) {
      return this.noteContentGeneratorService.staticFakeContent();
    } else {
      return this.noteContentGeneratorService.genericFakeContent();
    }
  };

  fakeUser = {
    username: 'John Doe',
    group: '2015_online_db',
    notesCounter: 21,
    awardsCounter: 2,
    enabled: true
  };

  return NoteFactory;

})();

angular.module('app').service('noteFactoryService', ['noteContentGeneratorService', NoteFactory]);
