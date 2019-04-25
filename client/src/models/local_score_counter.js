const PubSub = require('../helpers/pub_sub.js');

const LocalScoreCounter = function () {
  this.score = 0
};

LocalScoreCounter.prototype.react = function (boolean) {
  if (boolean == true) {this.score += 1};

  PubSub.publish('Score:score', this.score);
};



module.exports = LocalScoreCounter;
