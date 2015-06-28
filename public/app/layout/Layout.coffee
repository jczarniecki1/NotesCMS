defaultSubjects = [
    { name: 'ELE' }
    { name: 'SEM2'}
    { name: 'ZPR' }
    { name: 'TBO' }
]

fontFamilyOptions = [
	{ name: 'Muli', 	   value: 'Muli, sans-serif' }
	{ name: 'Open Sans',   value: 'Open Sans, sans-serif' }
	{ name: 'Helvetica',   value: 'Helvetica Neue, Helvetica, Noto Sans, Arial, sans-serif' }
	{ name: 'Philosopher', value: 'Philosopher, serif' }
	{ name: 'Palatino',    value: 'Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif' }
	{ name: 'Candara',     value: 'Candara, sans-serif' }
]

defaultFontFamily = 0

fakeUser = ->
    return {
        username: 'John Doe'
        group: '2015_online_db'
        enabled: true
        theme: localStorage.theme or 'primary'
	}

class Layout extends Directive
	constructor: (noteFactoryService) ->
		return {
			restrict: 'E'
			replace: true
			templateUrl: 'templates/Layout.html'
			link: (scope, element) ->
				scope.invertColors = ->
					scope.inverted = !scope.inverted
					localStorage.inverted = scope.inverted

				scope.allNotes = JSON.parse(localStorage.allNotes or "0") or [
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                    noteFactoryService.fakeNote()
	                ]

				scope.$watch 'allNotes', () ->
				    localStorage.allNotes = angular.toJson scope.allNotes
				, true # deep

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

				scope.$watch 'user.subject', ->
					localStorage.subjects = angular.toJson(scope.user.subjects)

				if localStorage.subjects
					scope.user.subjects = JSON.parse(localStorage.subjects)
				else
					scope.user.subjects = defaultSubjects

				scope.$watch 'user.fontFamily', ->
					return  unless scope.user.fontFamily?
					localStorage.fontFamily = scope.user.fontFamily
					document.styleSheets[0].addRule(
						'body, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4',
						"font-family: #{fontFamilyOptions[scope.user.fontFamily].value} !important;"
						)

				if localStorage.fontFamily
					scope.user.fontFamily = JSON.parse(localStorage.fontFamily)
				else
					scope.user.fontFamily = 2
		}
