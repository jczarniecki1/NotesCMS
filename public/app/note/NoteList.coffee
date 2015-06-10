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

class NoteList extends Directive
    constructor: -> 
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/html/NoteList.html'
            scope: {
                items: '='
                selected: '='
                subject: '='
                filterFavourites: '='
                filterBookmarks: '='
            }
            link: (scope) ->
                scope.items = [
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                ]
                
                scope.select = (item) ->
                    scope.selected = item
                    
                scope.itemsFilter = (item) ->
                    if scope.filterFavourites and !item.flags.starred
                        return false
                        
                    if scope.filterBookmarks and !item.flags.readLater
                        return false
                     
                    if scope.subject? and !scope.subject.showAll 
                        return item.subject is scope.subject.name or item.flags.edit 
                    else 
                        return true
        }