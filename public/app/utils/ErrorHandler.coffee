class Alert
    constructor: (@title, @message) ->

    ShowAfter: (timeout) ->
        setTimeout =>
            if $('.main').find('.loading').length
                sweetAlert
                    type: 'warning'
                    title: @title
                    text: @message
        , timeout
    
    #TODO: Hide

ErrorHandling =
    Message: (title, message) ->
        new Alert(title, message)