fakeUser = ->
    return {
        username: 'John Doe'
        group: '2015_online_db'
        enabled: true
        theme: localStorage.theme or 'primary'
	}


defaultSubjects = [
    { name: 'ELE' }
    { name: 'SEM2'}
    { name: 'ZPR' }
    { name: 'TBO' }
]

randomIndex = -> Math.floor(Math.random() * 9.9)
words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming']
getParagraph = ->
    [1..125].map(-> words[randomIndex()])
        .join(' ')
        .replace(/work/,'<strong>work</strong>')
        .replace(/programming/,'<span style="color: blue;">programming</span>')

subjects = ['JPA', 'TBO', 'TSA', 'IAB', 'ELE', 'KOR', 'ZPR', 'SEM2']
types = ['Project', 'Lecture', 'Exam', 'Exercises']
fakeNote = ->
    window.__lastId or= 1
    return {
        id: window.__lastId++
        title: [1..5].map(-> words[randomIndex()]).join(' ')
        subject: subjects[randomIndex()%8]
        subjectType: types[randomIndex()%4]
        content: '<h4>Lorem ipsum...</h4>' + "<p>#{getParagraph()}<p>" + "<p>#{getParagraph()}<p>"
        createdDate: new Date()
        flags:
            readLater: false
            done: false
            owned: (randomIndex() % 2 is 0)
            starred: false
        author:
            username: 'John Doe'
            group: '2015_online_db'
            notesCounter: 21
            awardsCounter: 2
            enabled: true
    }

class Layout extends Directive
	constructor: ->
		return {
			restrict: 'E'
			replace: true
			templateUrl: 'templates/html/Layout.html'
			link: (scope, element) ->
				scope.invertColors = ->
					scope.inverted = !scope.inverted
					localStorage.inverted = scope.inverted

				scope.allNotes = [
                    fakeNote()
                    fakeNote()
                    fakeNote()
                    fakeNote()
                    fakeNote()
                    fakeNote()
                    fakeNote()
                    fakeNote()
                ]

				scope.createNewNote = ->
					newNote =
						title: 'Untitled'
						subject: '???'
						subjectType: '???'
						createdDate: new Date()

						flags:
							owned: true
							published: false
							edit: true

					scope.allNotes.push newNote
					scope.currentNote = newNote

				scope.gotoStarred = ->
					scope.filterBookmarks = false
					scope.showUserProfile = false
					scope.filterFavourites = !scope.filterFavourites
					if scope.filterFavourites
						history.pushState({},'Favourites', '/#Favourites')
					else
						history.pushState({},'Index', '/')

				scope.gotoBookmarks = ->
					scope.filterFavourites = false
					scope.showUserProfile = false
					scope.filterBookmarks = !scope.filterBookmarks
					if scope.filterBookmarks
						history.pushState({},'Bookmarks', '/#Bookmarks')
					else
						history.pushState({},'Index', '/')

				scope.gotoUserProfile = ->
					scope.filterBookmarks = false
					scope.filterFavourites = false
					scope.showUserProfile = !scope.showUserProfile
					if scope.showUserProfile
						history.pushState({},'User Profile', '/#Profile')
					else
						history.pushState({},'Index', '/')

				currentHash = location.href.match(/#([^#]+)$/)?[1]

				if currentHash is 'Profile' then scope.showUserProfile = true
				if currentHash is 'Favourites' then scope.filterFavourites = true
				if currentHash is 'Bookmarks' then scope.filterBookmarks = true

				scope.user = fakeUser()

				scope.$watch 'users.subject', ->
					localStorage.subjects = angular.toJson(scope.user.subjects)

				if localStorage.subjects
					scope.user.subjects = JSON.parse(localStorage.subjects)
				else
					scope.user.subjects = defaultSubjects
		}
