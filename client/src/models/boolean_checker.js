const PubSub = require('../helpers/pub_sub.js');

const BooleanChecker = function(answerObject) {
  this.playerAnswer = answerObject[0];
  this.question = answerObject[1];
  this.result = "no result";
};

BooleanChecker.prototype.checkAnswer = function() {
  const correctAnswer = this.question.correct_answer;
  console.log(correctAnswer);
  if (this.playerAnswer == correctAnswer) {
    this.result = true;
  } else {this.result = false; };
};


module.exports = BooleanChecker;
