angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("templates/html/Layout.html","<div class=\"page\"><div class=\"toolbar-top\"><div ng-click=\"goStarred()\" class=\"btn btn-default mdi-2x mdi-action-stars\"></div><div ng-click=\"goReadLater()\" class=\"btn btn-default mdi-2x mdi-action-turned-in\"></div><div ng-click=\"goSearch()\" class=\"btn btn-default mdi-2x mdi-action-pageview\"></div><div ng-click=\"goAddNote()\" class=\"btn btn-default mdi-2x mdi-content-add\"></div></div><div class=\"toolbar-bottom\"><div ng-click=\"invertColors()\" class=\"btn btn-default mdi-2x mdi-communication-invert-colors-on\"></div><div ng-click=\"goUserProfile()\" class=\"btn btn-default mdi-2x mdi-action-account-box\"></div></div><div class=\"content\"><subject-tabs selected=\"currentSubject\"></subject-tabs><note-list subject=\"currentSubject\" selected=\"currentNote\"></note-list><note-preview item=\"currentNote\"></note-preview></div></div>");
$templateCache.put("templates/html/NoteList.html","<div class=\"list-group\"><!--.mdi-content-add--><div ng-repeat=\"item in items\" ng-click=\"select(item)\" ng-class=\"{ \'selected\': item.id === selected.id }\" class=\"list-group-item\"><div class=\"row-action-primary\"><i ng-if=\"item.flags.owned\" class=\"mdi-action-settings mdi-lg\"></i><i ng-if=\"!item.flags.done &amp;&amp; !item.flags.owned\" class=\"mdi-content-forward mdi-lg\"></i><i ng-if=\"item.flags.done\" class=\"mdi-navigation-check mdi-lg\"></i></div><div class=\"row-content\"> <div class=\"list-group-item-heading\"><i ng-if=\"item.flags.starred\" class=\"mdi-action-grade\"></i>{{ item.title }}</div><div class=\"list-group-item-text\">{{ item.subject }} | {{ item.subjectType }}</div></div></div></div>");
$templateCache.put("templates/html/NotePreview.html","<div ng-if=\"item\" class=\"note-preview-content\"><h3> <i ng-class=\"{ \'active\': item.flags.starred }\" ng-click=\"toggleStarred(item)\" class=\"starred-title-icon mdi-action-grade\"> </i>&nbsp;{{ item.title }}</h3><p>{{ item.subject }} | {{ item.subjectType }}</p><p>{{ item.content }}</p><div ng-if=\"!item.flags.owned\" ng-click=\"toggleDone(item)\" class=\"btn btn-primary btn-raised right\">Mark as {{ item.flags.done ? \'Undone\' : \'Done\' }}</div><div ng-if=\"!item.flags.owned\" data-toggle=\"modal\" data-target=\"#request-dialog\" class=\"btn btn-warning btn-raised\">Request Update</div><div id=\"request-dialog\" class=\"modal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">&times;</button><h4 class=\"modal-title\">Request update</h4></div><div class=\"modal-body\"><form><div class=\"form-group\"><label for=\"requestMessage\" class=\"col-lg-2 control-label\">Message</label><div class=\"col-lg-10\"><textarea id=\"requestMessage\" rows=\"3\" ng-model=\"requestMessage\" class=\"form-control\"></textarea><span class=\"help-block\">Message will be sent to the author and his group administrator.</span></div></div></form></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\">Abort</button><button type=\"button\" class=\"btn btn-primary\">Send</button></div></div></div></div><div ng-if=\"item.flags.owned\" ng-click=\"togglePublished(item)\" class=\"btn btn-warning btn-raised\">{{ item.flags.published ? \'Unpublish\' : \'Publish\' }}</div></div>");
$templateCache.put("templates/html/SubjectTabs.html","<ul class=\"nav nav-tabs\"><li ng-repeat=\"item in items\" ng-click=\"select(item)\" ng-class=\"{ \'active\': item === selected }\"><a href=\"#{{item.name}}\">{{item.name}}</a></li><li><a class=\"add-subject\"><i class=\"mdi-content-add\"></i></a></li></ul>");}]);