var mongoose = require('mongoose');

module.exports = function(snippets, guid, SnippetRecord) {

  snippets.forEach(function(snippet, index, array) {
    var url = snippet.wikipediaUrl || snippet.url;
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
            url: url
          }).save();
        }
      }
    });
  });

  return snippets;
};
