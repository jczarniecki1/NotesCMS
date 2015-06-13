allColors = []
allColors.refresh = ->

$ ->
    $.when $.get("/vendor/bootstrap-material-design/dist/css/material-fullpalette.min.css")
    .done (response) ->
        [].splice.apply allColors, [0,0].concat do ->
            _all = response
                .match(/.mdi-material-[a-z\-0-9]+,/g)
                .map (x) -> x.match(/.mdi-material-([a-z\-0-9]+),/)[1]
            return _all.filter (x, i) -> i is _all.lastIndexOf x
        try
            allColors.refresh()
        
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
                
                subjects = scope.user.subjects.map (x) -> x.name
                
                scope.subjectsTags =
                    tagsinputId: '$$$'
                    initTags: subjects
                    maxTags: 10
                    maxLength: 15
                    
                scope.onSubjectsChange = (data) ->
                    scope.user.subjects = data.tags.map (x) -> {name:x}
                    localStorage.subjects = JSON.stringify(scope.user.subjects)
                    
                scope.colors = [ 'teal', 'red', 'green', 'blue' ] # initial set
                
                allColors.refresh = -> scope.$apply()
                scope.colors = allColors
                
                scope.selectTheme = (color) ->
                    localStorage.theme = scope.user.theme = color
        }