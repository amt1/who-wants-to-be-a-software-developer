const PubSub = require('../helpers/pub_sub.js');

const BooleanChecker = function(answerObject) {
  this.playerAnswer = answerObject[0];
  this.question = answerObject[1];
  this.result = "no result";
};

BooleanChecker.prototype.checkAnswer = function() {
  const readableAnswer = this.trimAnswer();
  if (this.playerAnswer == readableAnswer) {
    this.result = true;
  } else {this.result = false; };
};


BooleanChecker.prototype.trimAnswer = function () {
  const answer = this.question.correct_answer;
  const answerLength = answer.length;
  const trimAnswer = answer.substring(2, (answerLength-2));
  return trimAnswer;
};

module.exports = BooleanChecker;
