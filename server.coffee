express = require('express');
app = new express()

app.use express.static __dirname + '\\public'
	.listen (process.env.PORT or 8080)