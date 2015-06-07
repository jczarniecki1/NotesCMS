class App extends App
    constructor: ->
        return ['ngRoute']

class AppConfig extends Config
    constructor: ->
        ErrorHandling.Message('Loading timeout', 'Initialization takes longer than expected...').ShowAfter 3500
        $.material.init()
        
# class Main extends Controller
#     constructor: ($scope) ->
#         $scope.currentProject = {id: 0}
#         $scope.$watch 'currentProject', ->
#             console.log 'currentProject changed -> ' + $scope.currentProject.id
        