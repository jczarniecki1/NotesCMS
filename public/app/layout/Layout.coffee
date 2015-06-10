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
					
				scope.goAddNote = ->
					newNote = 
						title: 'Untitled'
						subject: '???'
						subjectType: '???'
						createdDate: new Date()
        
						flags:
							owned: true
							published: false
							edit: true
					
					scope.allNotes.splice 0, 0, newNote
					scope.currentNote = newNote
					
				scope.goStarred = ->
					scope.filterFavourites = !scope.filterFavourites
					scope.filterBookmarks = false
										
				scope.goReadLater = ->
					scope.filterBookmarks = !scope.filterBookmarks
					scope.filterFavourites = false					
		}