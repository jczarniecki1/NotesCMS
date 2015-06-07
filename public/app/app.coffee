class App extends App
    constructor: ->
        return ['ngRoute']

class AppConfig extends Config
    constructor: ->
        ErrorHandling.Message('Loading timeout', 'Initialization takes longer than expected...').ShowAfter 3500
        $.material.init()
        

class AppInit extends Run
    constructor: ($rootScope) ->
        $rootScope.inverted = localStorage.inverted is 'true'
