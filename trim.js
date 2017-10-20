String.prototype.trim = (function() {
  function trim() {
    var string = this;
    var trimmedString = string.replace(/^\s+|\s+$/, '');

    return trimmedString;
  }

  return trim;
}());
