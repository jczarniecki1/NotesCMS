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
        
						flags:
							owned: true
							published: false
							edit: true
					
					scope.allNotes.splice 0, 0, newNote
					scope.currentNote = newNote
		}