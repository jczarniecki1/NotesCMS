
class SubjectTabs extends Directive
    constructor: -> 
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/html/SubjectTabs.html'
            scope: {
                selected: '='
            }
            link: (scope) ->
                scope.select = (item) ->
                    scope.selected = item
        }