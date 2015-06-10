class UserProfile extends Directive
    constructor: -> 
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/html/UserProfile.html'
            scope: {
                user: "="
            }
            link: (scope) ->
                
                subjects = JSON.parse(localStorage.subjects).map((x) -> x.name).slice(1)
                
                scope.subjectsTags =
                    tagsinputId: '$$$'
                    initTags: subjects
                    maxTags: 10
                    maxLength: 15
        }