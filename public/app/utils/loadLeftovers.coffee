###!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
###

loadCSS = (href, before, media, callback) ->
    'use strict'
    
    ss = window.document.createElement('link')
    ref = before or window.document.getElementsByTagName('script')[0]
    sheets = window.document.styleSheets
    ss.rel = 'stylesheet'
    ss.href = href
    ss.media = 'only x'
    if callback
        ss.onload = callback
    ref.parentNode.insertBefore ss, ref

    ss.onloadcssdefined = (cb) ->
        defined = undefined
        i = 0
        while i < sheets.length
            if sheets[i].href and sheets[i].href == ss.href
                defined = true
            i++
        if defined
            cb()
        else
            setTimeout ->
                ss.onloadcssdefined cb

    ss.onloadcssdefined ->
        ss.media = media or 'all'
    
    return ss

# Load remaining stylesheets
for url in Leftovers
    loadCSS url
