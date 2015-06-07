randomIndex = -> Math.floor(Math.random() * 9.9) 
words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming']
subjects = ['JPA', 'TBD', 'TSA', 'IAB', 'ELE', 'GUI', 'ABC', 'KOR', 'ZAP', 'JFA']
types = ['Project', 'Lecture', 'Exam', 'Exercises']
fakeNote = ->
    window.__lastId or= 1 
    return {
        id: window.__lastId++
        title: [1..5].map(-> words[randomIndex()]).join(' ') 
        subject: subjects[randomIndex()]
        subjectType: types[randomIndex()%4]
        content: 'Lorem ipsum... ' + [1..125].map(-> words[randomIndex()]).join(' ')
        created: '2015-02-23'
        updated: '2015-03-11'
        flags:
            readLater: false
            done: false
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
                #items: '='
                selected: '='
            }
            link: (scope) ->
                scope.items = [
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                    fakeNote()  
                ]
                
                scope.select = (item) ->
                    scope.selected = item
                    
        }