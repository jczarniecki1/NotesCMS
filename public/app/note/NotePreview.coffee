class NotePreview extends Directive
	constructor: -> 
		return {
			restrict: 'E'
			transclude: true
			templateUrl: '/templates/html/NotePreview.html'
			scope: {
				item: '='
			}
		}