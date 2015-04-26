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
  
  photos.get(req.query.latitude, req.query.longitude, 1, function(image) {
    data.image = image;

    snippets(req, res, function(snippets) {
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
