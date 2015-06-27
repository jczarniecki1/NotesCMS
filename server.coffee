express 	= require 'express'
compression = require 'compression'
path 		= require 'path'

headers =
	maxAge: 31536000
	setHeaders: (res) ->
        res.setHeader 'Cache-Control', 'public, max-age=31536000'
        res.setHeader 'Expires', new Date(Date.now() + 31536000).toUTCString()

app = new express()
app
	.use compression()
	.use express.static(path.normalize(__dirname + '/public'), headers)
	.get '/connection-test', (req, res) -> res.sendStatus 200
	.listen (process.env.PORT or 8080)