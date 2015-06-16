fakeUser = ->
    return {
        username: 'John Doe'
        group: '2015_online_db'
        enabled: true
        theme: localStorage.theme or 'primary'
	}

defaultFontFamily = 0

fontFamilyOptions = [
	{ name:'Roboto', value: "RobotoDraft,Roboto,Arial,sans-serif" }
	{ name:'Helvetica', value: "Helvetica Neue,Helvetica,Arial,sans-serif" }
	{ name:'Calibri', value: "Calibri Light,Calibri,sans-serif" }
	{ name:'Candara', value: "Candara,sans-serif" }
]

defaultSubjects = [
    { name: 'ELE' }
    { name: 'SEM2'}
    { name: 'ZPR' }
    { name: 'TBO' }
]

randomIndex = -> Math.floor(Math.random() * 9.9)
words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming']
getParagraph = ->
    [1..125].map(-> words[randomIndex()])
        .join(' ')
        .replace(/work/,'<strong>work</strong>')
        .replace(/programming/,'<span style="color: blue;">programming</span>')

subjects = ['JPA', 'TBO', 'TSA', 'IAB', 'ELE', 'KOR', 'ZPR', 'SEM2']
types = ['Project', 'Lecture', 'Exam', 'Exercises']
fakeNote = ->
    window.__lastId or= 1
    return {
        id: window.__lastId++
        title: [1..5].map(-> words[randomIndex()]).join(' ')
        subject: subjects[randomIndex()%8]
        subjectType: types[randomIndex()%4]
        content: '<h4>Lorem ipsum...</h4>' + "<p>#{getParagraph()}<p>" + "<p>#{getParagraph()}<p>"
        createdDate: new Date()
        flags:
            readLater: false
            done: false
            owned: (randomIndex() % 2 is 0)
            starred: false
        author:
            username: 'John Doe'
            group: '2015_online_db'
            notesCounter: 21
            awardsCounter: 2
            enabled: true
    }

fakeContent = '
<h1>HTTP 2.0<br></h1>
<h3>Lack of multiplexing (HTTP 1.1)</h3>
<p>A single slow response blocks     all requests behind it.&nbsp;<span style="background-color: transparent;">Parallel requests requires     buffering on the server.&nbsp;</span><span style="background-color: transparent;">Failed response may terminate     TCP connection, forcing the client to request subsequent resources again.&nbsp;</span><span style="background-color: transparent;">Pipelining requires tunnelling     (HTTPS) as best practice.&nbsp;</span><span style="background-color: transparent;">Clients that want to maximize     throughput open multiple TCP streams (it costs).</span></p>
<p>  </p>
<p></p>
<p></p>
<p><span style="background-color: transparent;"></span></p>
<ul>
	<li><span style="background-color: transparent;">6 connections per host is a      trade-off (overhead vs transfer)</span><br></li>
</ul>
<p></p>
<p></p>
<p></p>
<p></p>
<hr>
<h3>Domain sharding</h3>
<ul>
	<li>More overhead and DNS lookups</li>
	<li><span style="background-color: transparent;">But we use them if 6      connections is not enough</span><br></li>
	<li><span style="background-color: transparent;">It actually hurts user      experience if many of the connections never escape TCP slow-start</span></li>
	<ul>
		<li><span style="background-color: transparent;">Affects high-latency clients       the most (e.g. Mobile devices using 3G and 4G)</span></li>
	</ul>
</ul>
<p></p>
<hr>
<h3>Protocol overhead</h3>
<ul>
	<li><span style="background-color: transparent;">Headers are not compressed (and cookies)</span></li>
	<li><span style="background-color: transparent;">Chatty behaviour of web apps can lead to HTTP overheadthat exceeds payload</span></li>
	<li><span style="background-color: transparent;">Large enough to midgate     networking overhead</span><br></li>
</ul>
<p><br></p>
<p></p>
<p></p>
<blockquote><p><span style="background-color: transparent;">Ideal size of a CSS or a JavaScript bundle:&nbsp;</span><span style="background-color: transparent;"><b><u>30-50KB</u></b>&nbsp;</span><span style="background-color: transparent;">(compressed)</span></p></blockquote>
<p><span style="background-color: transparent;"><span id="selectionBoundary_1434409052409_06158166378736496" class="rangySelectionBoundary">﻿</span></span></p>
'


class Layout extends Directive
	constructor: ->
		return {
			restrict: 'E'
			replace: true
			templateUrl: 'templates/html/Layout.html'
			link: (scope, element) ->
				scope.invertColors = ->
					scope.inverted = !scope.inverted
					localStorage.inverted = scope.inverted

				scope.allNotes = [
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                    fakeNote()
	                ]

				scope.allNotes[0].title = 'High Performance Browser Networking'
				scope.allNotes[0].content = fakeContent

				scope.createNewNote = ->
					newNote =
						title: 'Untitled'
						subject: '???'
						subjectType: '???'
						createdDate: new Date()

						flags:
							owned: true
							published: false
							edit: true

					scope.allNotes.push newNote
					scope.currentNote = newNote

				scope.gotoStarred = ->
					scope.filterBookmarks = false
					scope.showUserProfile = false
					scope.filterFavourites = !scope.filterFavourites
					if scope.filterFavourites
						history.pushState({},'Favourites', '/#Favourites')
					else
						history.pushState({},'Index', '/')

				scope.gotoBookmarks = ->
					scope.filterFavourites = false
					scope.showUserProfile = false
					scope.filterBookmarks = !scope.filterBookmarks
					if scope.filterBookmarks
						history.pushState({},'Bookmarks', '/#Bookmarks')
					else
						history.pushState({},'Index', '/')

				scope.gotoUserProfile = ->
					scope.filterBookmarks = false
					scope.filterFavourites = false
					scope.showUserProfile = !scope.showUserProfile
					if scope.showUserProfile
						history.pushState({},'User Profile', '/#Profile')
					else
						history.pushState({},'Index', '/')

				currentHash = location.href.match(/#([^#]+)$/)?[1]

				if currentHash is 'Profile' then scope.showUserProfile = true
				if currentHash is 'Favourites' then scope.filterFavourites = true
				if currentHash is 'Bookmarks' then scope.filterBookmarks = true

				scope.user = fakeUser()

				scope.$watch 'user.subject', ->
					localStorage.subjects = angular.toJson(scope.user.subjects)

				if localStorage.subjects
					scope.user.subjects = JSON.parse(localStorage.subjects)
				else
					scope.user.subjects = defaultSubjects

				scope.$watch 'user.fontFamily', ->
					return  unless scope.user.fontFamily?
					localStorage.fontFamily = scope.user.fontFamily
					document.styleSheets[0].addRule(
						'body, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4',
						"font-family: #{fontFamilyOptions[scope.user.fontFamily].value} !important;"
						)

				if localStorage.fontFamily
					scope.user.fontFamily = JSON.parse(localStorage.fontFamily)
				else
					scope.user.fontFamily = 1
		}
