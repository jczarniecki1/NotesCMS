express = require('express');
path = require('path')
app = new express()

app.use express.static path.normalize(__dirname + '/public')
	.listen (process.env.PORT or 8080)