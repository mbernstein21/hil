var request = require('request');
var mongoose = require('mongoose');

var databaseUri =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

var getSnippets = function(req, res, callback) {
  var geoMapper = {
    baseUrl: 'http://api.geonames.org/findNearbyWikipediaJSON',
    username: 'mbernstein21',
    radius: '20',
    style: 'full'
  };

  var queryParams = {
    lat: req.query.latitude,
    lng: req.query.longitude,
    username: 'mbernstein21',
    radius: '20',
    style: 'full',
    maxRows: '25'
  };

  var options = {
    url: 'http://api.geonames.org/findNearbyWikipediaJSON',
    qs: queryParams
  };

  mongoose.connect(databaseUri, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + databaseUri + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + databaseUri);
    }
  });

  var snippetSchema = new mongoose.Schema({
    guid: String,
    url: String
  });

  var SnippetRecord = mongoose.model('SnippetRecords', snippetSchema);

  // Creating one user.
  var test123 = new SnippetRecord ({
    guid: 'Hello',
    url: 'World'
  });

  // Saving it to the database.  
  test123.save(function (err) {if (err) console.log ('Error on save!')});

  request(options, function(err, response, body) {
    if (err) {
      callback({});
    } else {
      var formattedArray = JSON.parse(body).geonames;
      formattedArray.forEach(function(value, index, array) {
        if (value.summary === undefined) {
          array.splice(index, 1);
        }
      });
      callback(formattedArray);
    }
  });
};

module.exports = getSnippets;
