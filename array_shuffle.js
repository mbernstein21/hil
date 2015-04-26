// From http://stackoverflow.com/a/6274381
module.exports = function(arr) {
  for (
    var j, x, i = arr.length;
    i;
    j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr;
};
