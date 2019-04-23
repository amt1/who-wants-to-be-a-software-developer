const ScoreCounter = function () {
  this.score = 0
};

ScoreCounter.prototype.react = function (boolean) {
  if (boolean == true) {this.score += 1};
};

module.exports = ScoreCounter;
