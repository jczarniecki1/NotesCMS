
defaultSubjects = [
    { name: 'ELE' }
    { name: 'SEM2'}
    { name: 'ZPR' }
    { name: 'TBO' }
]

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
                    # TODO: sync with server
                
                scope.select = (item) ->
                    scope.selected = item
                
                if localStorage.subjects
                    scope.items = JSON.parse(localStorage.subjects)
                else 
                    scope.items = defaultSubjects
                    saveSubjects()
                
                scope.addSubject = ->
                    console.log "addSubject: [#{scope.newSubjectName}]"
                    if scope.newSubjectName.match(/^[a-z]+$/i)
                        name = scope.newSubjectName.toUpperCase()
                        scope.items.push {name}
                        saveSubjects()
                        scope.newSubjectName = undefined
                        setTimeout () -> 
                            $('#quick-add-subject-dialog').modal('toggle')
        }