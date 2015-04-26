module.exports = function(snippets, images) {
  images.forEach (function(image) {
    var insertedIndex = Math.floor(Math.random() * snippets.length);
    snippets.splice(insertedIndex, 0, image);
  });
  return snippets;
};
