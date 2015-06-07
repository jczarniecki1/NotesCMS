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
		}