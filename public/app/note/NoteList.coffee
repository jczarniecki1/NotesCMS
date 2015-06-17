class NoteList extends Directive
    constructor: -> 
        return {
            restrict: 'E'
            transclude: true
            templateUrl: '/templates/NoteList.html'
            scope: {
                items: '='
                selected: '='
                subject: '='
                filterFavourites: '='
                filterBookmarks: '='
                showUserNotes: '='
            }
            link: (scope) ->                
                scope.select = (item) ->
                    scope.selected = item
                    
                scope.itemsFilter = (item) ->
                    if item.flags.edit
                        return true
                    
                    if scope.filterFavourites and !item.flags.starred
                        return false
                        
                    if scope.filterBookmarks and !item.flags.readLater
                        return false
                        
                    if (!scope.showUserNotes) and item.flags.owned
                        return false
                     
                    if scope.subject? and !scope.subject.showAll
                        return item.subject is scope.subject.name 
                    else 
                        return true
        }