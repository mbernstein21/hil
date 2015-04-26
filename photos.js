var API500px = require('500px');
var api500px = new API500px(process.env.FIVEHUNDREDPX_CONSUMER_KEY);
var MAX_PHOTOS_COUNT = 5;

function pick_image(size) {
  if (size === 'medium') {
    return 0;
  }
  else if (size === 'large') {
    return 1;
  }
}

module.exports = {
  get: function(lat, lng, radius, callback) {
    api500px.photos.searchByGeo(
      lat + ',' + lng + ',' + radius + 'mi',
      {
        'image_size[]': [600, 1600],
        exclude: 'Black and White'
      },
      function(error, results) {
        if (error) {
          callback(error);
          return;
        }
        
        var photos = [];
        var photos_count = results.photos.length > MAX_PHOTOS_COUNT ? MAX_PHOTOS_COUNT : results.photos.length;
        
        var i = 0;
        while (photos.length < photos_count) {
          if (!results.photos[i].nsfw) {
            photos.push({
              image_url: i === 0 ? results.photos[i].image_url[pick_image('large')] :
                results.photos[i].image_url[pick_image('medium')],
              latitude: results.photos[i].latitude,
              longitude: results.photos[i].longitude,
              summary: results.photos[i].description || '',
              title: results.photos[i].name || '',
              width: results.photos[i].width,
              height: results.photos[i].height,
              nsfw: results.photos[i].nsfw,
              url: 'https://500px.com' + results.photos[i].url,
              photographer: results.photos[i].user.fullname,
            });
          }
          i++;
        }
        
        callback(photos);
      }
    );
  }
};
