const LocalScoreCounter = function () {
  this.score = 0
};

LocalScoreCounter.prototype.react = function (boolean) {
  if (boolean == true) {this.score += 1};
};

module.exports = LocalScoreCounter;
