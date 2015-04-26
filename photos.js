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
        }
        
        var photo = {};
        
        if (results.total_items > 0) {
          photo = {
            image_url: results.photos[0].image_url,
            latitude: results.photos[0].latitude,
            longitude: results.photos[0].longitude,
            description: results.photos[0].description,
            width: results.photos[0].width,
            height: results.photos[0].height,
            nsfw: results.photos[0].nsfw,
            url: results.photos[0].url,
            photographer: results.photos[0].user.fullname,
          }
        };
        
        callback(photo);
      }
    );
  }
};
