var request = require('request');

module.exports = {
  get: function(date_string, callback) {
    if (/\d?\d\/\d?\d/.test(date_string)) {
      request({
        url: 'http://hidden-sands-6666.herokuapp.com/api/2015/'+ date_string +'/'
      }, function(err, response, body) {
        if (err) {
          callback({});
        }
        else {
          callback(JSON.parse(response));
        }
      });
    }
    else {
      callback({});
    }
  }
};
