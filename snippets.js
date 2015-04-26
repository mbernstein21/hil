var request = require('request');

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
