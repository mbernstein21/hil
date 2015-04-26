var mongoose = require('mongoose');

var getHils = function(latitude, longitude, HilRecord) {
  console.log("inside get hils");
  var query = HilRecord.find({});
  query.exec(function(err, result) {
    if (!err) {
      console.log("here is the result from hil records");
      console.log(JSON.stringify(result));
      return result;
    }
  });

  return [];
};

var postHils = function(hils, guid, HilRecord) {
  var newRecord = HilRecord({
    latitude: hils.latitude,
    longitude: hils.longitude,
    guid: guid,
    title: hils.title
  });
  console.log("here is a post");
};

module.exports = {
  get: getHils,
  post: postHils
};
