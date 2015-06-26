express 	= require 'express'
compression = require 'compression'
path 		= require 'path'

app = new express()
app
	.use compression()
	.use express.static path.normalize(__dirname + '/public')
	.get '/connection-test', (req, res) -> res.sendStatus 200
	.listen (process.env.PORT or 8080)