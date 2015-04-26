var express = require('express');
var mongoose = require('mongoose');
var wikipedia;
var app = express();

var snippets = require('./snippets');
var photos = require('./photos');
var arrayShuffle = require('./array_shuffle');
var snippetRecords = require('./snippetRecords');
var this_day = require('./this-day-in-history');

var databaseUri =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/HelloMongoose';

mongoose.connect(databaseUri, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + databaseUri + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + databaseUri);
  }
});

var snippetSchema = new mongoose.Schema({
  guid: String,
  url: String,
  loc: {
    type: [Number],
    index: '2dsphere'
  }
});

var SnippetRecord = mongoose.model('SnippetRecords', snippetSchema);

app.get('/', function (req, res) {
  var data = {};
  
  if (!req.query.latitude || !req.query.longitude) {
    res.send(data);
    return;
  }
  
  photos.get(req.query.latitude, req.query.longitude, 1, function(images) {
    if (images.length) {
      data.image = images.shift();
    }

    snippets(req, res, function(snippets) {
      // Shuffle images into the snippets array and make sure the first 
      // snippet is always a text snippet
      var first = snippets.shift();
      snippets = arrayShuffle(snippets, images);
      snippets.unshift(first);
      var guid = req.query.guid;
      
      if (!req.query.date_string) {
        data.snippets = snippetRecords(snippets, guid, [req.query.latitude, req.query.longitude], SnippetRecord);
        res.send(data);
        return;
      }
      
      this_day.get(req.query.date_string, function(day_info) {
        snippets.push(day_info);
        var first = snippets.shift();
        snippets = arrayShuffle(snippets, [day_info]);
        snippets.unshift(first);
        
        data.snippets = snippetRecords(snippets, guid, [req.query.latitude, req.query.longitude], SnippetRecord);
        res.send(data);
      });
    });
  });
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
