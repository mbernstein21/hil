var request = require('request');
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

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
          var day_info = JSON.parse(response.body);
          var d = new Date(day_info.date);
          
          callback({
            title: months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ' ' + d.getUTCFullYear(),
            summary: day_info.event
          });
        }
      });
    }
    else {
      callback({});
    }
  }
};
