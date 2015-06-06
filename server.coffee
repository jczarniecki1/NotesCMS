express = require('express');
app = new express()

app.use express.static __dirname + '\\public'
	.listen 8080