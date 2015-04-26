var request = require('request');

module.exports = {
  get: function(date_string, callback) {
    if (/\d{4}\/\d?\d\/\d?\d/.test(date_string)) {
      request({
        url: 'http://hidden-sands-6666.herokuapp.com/api/'+ date_string +'/'
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
