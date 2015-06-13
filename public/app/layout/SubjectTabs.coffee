setSubjectFromHash = (scope) ->
    selectableItems = scope.items.slice(1)
    matchingHash = location.href.match(/#([^#]+)$/)
    currentHash = matchingHash?[1]
    matchingItem = selectableItems.filter((x) -> x.name is currentHash)[0]
    scope.selected = matchingItem or { name:'All', showAll: true }


class SubjectTabs extends Directive
    constructor: ->
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/html/SubjectTabs.html'
            scope: {
                selected: '='
                items: '='
                theme: '='
            }
            link: (scope) ->

                scope.select = (item) ->
                    scope.selected = item

                scope.addSubject = ->
                    if scope.newSubjectName.match(/^[a-z]+$/i)
                        name = scope.newSubjectName.toUpperCase()
                        scope.items.push {name}
                        scope.newSubjectName = undefined
                        setTimeout () ->
                            $('#quick-add-subject-dialog').modal('toggle')

                setSubjectFromHash(scope)
        }
