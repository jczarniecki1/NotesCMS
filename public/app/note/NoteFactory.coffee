subjects = ['JPA', 'TBO', 'TSA', 'IAB', 'ELE', 'KOR', 'ZPR', 'SEM2']
types = ['Project', 'Lecture', 'Exam', 'Exercises']
randomIndex = -> Math.floor(Math.random() * 9.9)

class Note
	constructor: (noteDate) ->
		for key, value of noteDate
			@[key] = value

class NoteFactory extends Service
	_lastId = 0

	constructor: (@noteContentGeneratorService) ->

	fakeNote: ->
	    return new Note {
	        id: ++_lastId
	        title: @getFakeTitle()
	        subject: subjects[randomIndex()%8]
	        subjectType: types[randomIndex()%4]
	        content: @getFakeContent()
	        createdDate: new Date()
	        flags:
	            readLater: false
	            done: false
	            owned: (randomIndex() % 2 is 0)
	            starred: false
	        author: fakeUser
	    }

	getFakeTitle: ->
		if (_lastId is 1)
			'High Performance Browser Networking'
		else
			[1..5].map(-> words[randomIndex()]).join(' ')

	getFakeContent: ->
		if (_lastId is 1)
			@noteContentGeneratorService.staticFakeContent()
		else
			@noteContentGeneratorService.genericFakeContent()

	fakeUser =
		username: 'John Doe'
		group: '2015_online_db'
		notesCounter: 21
		awardsCounter: 2
		enabled: true
