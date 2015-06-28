setTimeout ->
	_leftoversScript = document.createElement('script')
	_leftoversScript.setAttribute 'src', '/dest/app/utils/loadLeftovers.js'
	_leftoversScript.setAttribute 'async', ''
	document.body.appendChild _leftoversScript
, parseInt(localStorage.leftoversTimeout or "500")
localStorage.leftoversTimeout = "0"