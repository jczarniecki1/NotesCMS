express 	= require 'express'
compression = require 'compression'
path 		= require 'path'

headers =
	maxAge: 345600
	setHeaders: (res) ->
        res.setHeader 'Cache-Control', 'public, max-age=345600'
        res.setHeader 'Expires', new Date(Date.now() + 345600000).toUTCString()

app = new express()
app
	.use compression()
	.use express.static(path.normalize(__dirname + '/public'), headers)
	.get '/connection-test', (req, res) -> res.sendStatus 200
	.listen (process.env.PORT or 8080)