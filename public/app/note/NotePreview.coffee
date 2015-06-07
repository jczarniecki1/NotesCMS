class NotePreview extends Directive
	constructor: -> 
		return {
			restrict: 'E'
			transclude: true
			templateUrl: '/templates/html/NotePreview.html'
			scope: {
				item: '='
			}
			link: (scope) ->
				
				scope.requestMessage = 'Seem that this note is outdated...'
				
				scope.toggleDone = (item) ->
					item.flags.done = !item.flags.done
					# TODO: save in background
					
				scope.toggleStarred = (item) ->
					item.flags.starred = !item.flags.starred
					# TODO: save in background

				scope.togglePublished = (item) ->
					item.flags.published = !item.flags.published
					# TODO: save in background
				
				scope.showRequestDialog = (item) ->
					scope.requestDialogVisible = true
							
		}