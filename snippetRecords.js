var mongoose = require('mongoose');

module.exports = function(snippets, guid, coordinates, SnippetRecord) {

  snippets.forEach(function(snippet, index, array) {
    var url = snippet.wikipediaUrl || snippet.url || snippet.title;
    var query = SnippetRecord.find({
      'guid': guid,
      'url': url
    });
    query.exec(function(err, result) {
      if (!err) {
        if (result[0]) {
          console.log("record already exists");
          array.splice(index, 1);
        } else {
          console.log("new record");
          SnippetRecord({
            guid: guid,
            url: url,
            loc: coordinates
          }).save();
        }
      }
    });
    
    SnippetRecord.where('loc').near({
      center: {
        type: 'Point',
        coordinates: [42.369, -71.076]
      },
      maxDistance: 5
    }).exec(console.log);
  });

  return snippets;
};
