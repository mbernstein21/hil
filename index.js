var express = require('express');
var snippets = require('./snippets');
var wikipedia;
var app = express();

var photos = require('./photos');

app.get('/', function (req, res) {
  var data = {};
  
  if (!req.query.latitude || !req.query.longitude) {
    res.send(data);
    return;
  }
  
  // From http://stackoverflow.com/a/6274381
  function shuffle(arr) {
    for (
      var j, x, i = arr.length;
      i;
      j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }
  
  photos.get(req.query.latitude, req.query.longitude, 1, function(images) {
    if (images.length) {
      data.image = images.shift();
    }

    snippets(req, res, function(snippets) {
      // Shuffle images into the snippets array and make sure the first 
      // snippet is always a text snippet
      var first = snippets.shift();
      snippets = snippets.concat(images);
      snippets = shuffle(snippets);
      snippets.unshift(first)
      
      data.snippets = snippets;
      res.send(data);
    });
  });
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
