
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
                
                scope.items = [
                    { name: 'ELE' }
                    { name: 'SEM2'}
                    { name: 'ZPR' }
                    { name: 'TBO' }
                ]
        }