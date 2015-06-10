
defaultSubjects = [
    { name: 'All', showAll: true }
    { name: 'ELE' }
    { name: 'SEM2'}
    { name: 'ZPR' }
    { name: 'TBO' }
]

setSubjectFromHash = (scope) ->
    selectableItems = scope.items.slice(1)
    matchingHash = location.href.match(/#([^#]+)$/) 
    currentHash = matchingHash?[1]
    matchingItem = selectableItems.filter((x) -> x.name is currentHash)[0]
    scope.selected = matchingItem or scope.items[0]
        

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
                
                saveSubjects = ->
                    localStorage.subjects = angular.toJson(scope.items)
                
                scope.select = (item) ->
                    scope.selected = item
                
                if localStorage.subjects 
                    scope.items = JSON.parse(localStorage.subjects)
                    #temp migration fix
                    if scope.items.filter((x) -> x.showAll).length is 0
                        scope.items = defaultSubjects
                        saveSubjects()
                else 
                    scope.items = defaultSubjects
                    saveSubjects()
                
                scope.addSubject = ->
                    if scope.newSubjectName.match(/^[a-z]+$/i)
                        name = scope.newSubjectName.toUpperCase()
                        scope.items.push {name}
                        saveSubjects()
                        scope.newSubjectName = undefined
                        setTimeout () -> 
                            $('#quick-add-subject-dialog').modal('toggle')
                            
                setSubjectFromHash(scope)
        }