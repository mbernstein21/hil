var API500px = require('500px');
var api500px = new API500px(process.env.FIVEHUNDREDPX_CONSUMER_KEY);

module.exports = {
  get: function(lat, lng, radius, callback) {
    api500px.photos.searchByGeo(
      lat + ',' + lng + ',' + radius + 'mi',
      {
        image_size: 2048
      },
      function(error, results) {
        if (error) {
          callback(error);
          return;
        }
        
        var photos = [];
        
        for (var i = 0; i < results.photos.length; i++) {
          photos.push({
            image_url: results.photos[i].image_url,
            latitude: results.photos[i].latitude,
            longitude: results.photos[i].longitude,
            description: results.photos[i].description,
            width: results.photos[i].width,
            height: results.photos[i].height,
            nsfw: results.photos[i].nsfw,
            url: 'https://500px.com' + results.photos[i].url,
            photographer: results.photos[i].user.fullname,
          });
        }
        
        callback(photos);
      }
    );
  }
};
