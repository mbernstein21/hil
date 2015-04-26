var express = require('express');
var app = express();

var photos = require('./photos');

app.get('/', function (req, res) {
  var data = {};
  
  photos.get(req.query.latitude, req.query.longitude, 1, function(image) {
    data.image = image;
    res.send(data);
  })
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
