class App extends App
    constructor: ->
        return ['ngRoute', 'textAngular']

class AppConfig extends Config
    constructor: ->
        ErrorHandling.Message('Loading timeout', 'Initialization takes longer than expected...').ShowAfter 3500
        $.material.init()
        

class AppInit extends Run
    constructor: ($rootScope, taOptions) ->
        $rootScope.inverted = localStorage.inverted is 'true'
        
        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear']
            ['html', 'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent', 'insertImage','insertLink']
        ]
