class UserProfile extends Directive
    constructor: -> 
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/html/UserProfile.html'
            scope: {
                user: '='
            }
            link: (scope) ->
                
                subjects = JSON.parse(localStorage.subjects).map((x) -> x.name).slice(1)
                
                scope.subjectsTags =
                    tagsinputId: '$$$'
                    initTags: subjects
                    maxTags: 10
                    maxLength: 15
                    
                scope.colors = [
                    'teal'
                    'light-blue-300'
                    'green-100'
                    'red'
                ]
                
                $ ->
                    $.when $.get("/vendor/bootstrap-material-design/dist/css/material-fullpalette.min.css")
                    .done (response) ->
                        
                        allColors = response
                            .match(/.mdi-material-[a-z\-0-9]+,/g)
                            .map (x) -> x.match(/.mdi-material-([a-z\-0-9]+),/)[1]
                        scope.colors = allColors.filter (x, i) -> i is allColors.lastIndexOf x
                        scope.$apply()
                
                scope.selectTheme = (color) ->
                    localStorage.theme = scope.user.theme = color
        }