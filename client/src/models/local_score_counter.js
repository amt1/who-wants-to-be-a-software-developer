const PubSub = require('../helpers/pub_sub.js');

const LocalScoreCounter = function () {
  this.score = 0
  this.allQuestions = [];
  this.allAnswers = [];
};

LocalScoreCounter.prototype.bindEvents = function() {
  PubSub.subscribe('QuestionGenerator:no-more-questions', (evt) => {
    PubSub.publish('Stats:stats-ready', [this.allQuestions, this.allAnswers, this.score])
  });
};

LocalScoreCounter.prototype.react = function (boolean) {
  if (boolean == true) {this.score += 1};
};

LocalScoreCounter.prototype.keepStats = function(array) {
  this.allQuestions.push(array[0])
  this.allAnswers.push(array[1])

};


module.exports = LocalScoreCounter;
