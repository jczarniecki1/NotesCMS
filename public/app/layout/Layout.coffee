fakeUser = ->
    return {
        username: 'John Doe'
        group: '2015_online_db'
        enabled: true
	}

class Layout extends Directive
	constructor: ->
		return {
			restrict: 'E'
			replace: true
			templateUrl: 'templates/html/Layout.html',
			link: (scope, element) ->
				scope.invertColors = ->
					scope.inverted = !scope.inverted
					localStorage.inverted = scope.inverted
					
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
						history.back()

				scope.gotoBookmarks = ->
					scope.filterFavourites = false
					scope.showUserProfile = false
					scope.filterBookmarks = !scope.filterBookmarks
					if scope.filterBookmarks
						history.pushState({},'Bookmarks', '/#Bookmarks')
					else
						history.back()
					
				scope.gotoUserProfile = ->
					scope.filterBookmarks = false
					scope.filterFavourites = false
					scope.showUserProfile = !scope.showUserProfile
					if scope.showUserProfile
						history.pushState({},'User Profile', '/#Profile')
					else
						history.back()
						
				currentHash = location.href.match(/#([^#]+)$/)?[1]
				
				if currentHash is 'Profile' then scope.showUserProfile = true
				if currentHash is 'Favourites' then scope.filterFavourites = true
				if currentHash is 'Bookmarks' then scope.filterBookmarks = true
				
				scope.user = fakeUser()
		}