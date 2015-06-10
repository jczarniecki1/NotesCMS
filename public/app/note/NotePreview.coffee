class NotePreview extends Directive
	constructor: -> 
		return {
			restrict: 'E'
			transclude: true
			templateUrl: '/templates/html/NotePreview.html'
			scope: {
				items: '='
				item: '='
			}
			link: (scope) ->
				
				setFirst = (item) ->
					index = scope.items.indexOf(item)
					scope.items.splice index, 1
					scope.items.splice 0, 0, item
				
				scope.requestMessage = 'Seem that this note is outdated...'
				
				scope.toggleDone = (item) ->
					item.flags.done = !item.flags.done
					# TODO: save in background
					
				scope.toggleStarred = (item) ->
					item.starredDate = unless item.starredDate then new Date() else undefined
					item.starredOrderValue = if item.starredDate then (Number.MAX_SAFE_INTEGER - item.starredDate) else undefined
					item.flags.starred = item.starredDate?
					# TODO: save in background

				scope.togglePublished = (item) ->
					item.flags.published = !item.flags.published
					# TODO: save in background
				
				scope.toggleReadLater = (item) ->
					item.flags.readLater = !item.flags.readLater
					
				scope.removeCurrentItem = ->
					index = scope.items.indexOf(scope.item)
					scope.items.splice index, 1
					nextIndex = if index < scope.items.length then index else index - 1
					scope.item = scope.items[nextIndex]
					setTimeout () -> $('#remove-dialog').modal('toggle')
					# TODO: save in background
				
				scope.toggleEditMode = (item) ->
					item.flags.edit = !item.flags.edit
					setFirst item
		}