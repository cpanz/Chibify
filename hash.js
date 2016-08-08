function generateHash() {
  var currentTime = Date.now() / 1000;
  return currentTime.toString(36);
}

module.exports = generateHash;