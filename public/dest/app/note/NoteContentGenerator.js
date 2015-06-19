var NoteContentGenerator, getParagraph, randomIndex, words;

words = ['awesome', 'Lorem', 'ipsum', 'very', 'hard', 'lots of', 'work', 'weekend', 'notes', 'programming'];

randomIndex = function() {
  return Math.floor(Math.random() * 9.9);
};

getParagraph = function() {
  var i, results;
  return (function() {
    results = [];
    for (i = 1; i <= 125; i++){ results.push(i); }
    return results;
  }).apply(this).map(function() {
    return words[randomIndex()];
  }).join(' ').replace(/work/, '<strong>work</strong>').replace(/programming/, '<span style="color: blue;">programming</span>');
};

NoteContentGenerator = (function() {
  function NoteContentGenerator() {}

  NoteContentGenerator.prototype.genericFakeContent = function() {
    return '<h4>Lorem ipsum...</h4>' + ("<p>" + (getParagraph()) + "<p>") + ("<p>" + (getParagraph()) + "<p>");
  };

  NoteContentGenerator.prototype.staticFakeContent = function() {
    return '<h1>HTTP 2.0<br></h1> <h3>Lack of multiplexing (HTTP 1.1)</h3> <p>A single slow response blocks     all requests behind it.&nbsp;<span style="background-color: transparent;">Parallel requests requires     buffering on the server.&nbsp;</span><span style="background-color: transparent;">Failed response may terminate     TCP connection, forcing the client to request subsequent resources again.&nbsp;</span><span style="background-color: transparent;">Pipelining requires tunnelling     (HTTPS) as best practice.&nbsp;</span><span style="background-color: transparent;">Clients that want to maximize     throughput open multiple TCP streams (it costs).</span></p> <p>  </p> <p></p> <p></p> <p><span style="background-color: transparent;"></span></p> <ul> <li><span style="background-color: transparent;">6 connections per host is a      trade-off (overhead vs transfer)</span><br></li> </ul> <p></p> <p></p> <p></p> <p></p> <hr> <h3>Domain sharding</h3> <ul> <li>More overhead and DNS lookups</li> <li><span style="background-color: transparent;">But we use them if 6      connections is not enough</span><br></li> <li><span style="background-color: transparent;">It actually hurts user      experience if many of the connections never escape TCP slow-start</span></li> <ul> <li><span style="background-color: transparent;">Affects high-latency clients       the most (e.g. Mobile devices using 3G and 4G)</span></li> </ul> </ul> <p></p> <hr> <h3>Protocol overhead</h3> <ul> <li><span style="background-color: transparent;">Headers are not compressed (and cookies)</span></li> <li><span style="background-color: transparent;">Chatty behaviour of web apps can lead to HTTP overheadthat exceeds payload</span></li> <li><span style="background-color: transparent;">Large enough to midgate     networking overhead</span><br></li> </ul> <p><br></p> <p></p> <p></p> <blockquote><p><span style="background-color: transparent;">Ideal size of a CSS or a JavaScript bundle:&nbsp;</span><span style="background-color: transparent;"><b><u>30-50KB</u></b>&nbsp;</span><span style="background-color: transparent;">(compressed)</span></p></blockquote> <p><span style="background-color: transparent;"><span id="selectionBoundary_1434409052409_06158166378736496" class="rangySelectionBoundary">﻿</span></span></p>';
  };

  return NoteContentGenerator;

})();

angular.module('app').service('noteContentGeneratorService', [NoteContentGenerator]);
