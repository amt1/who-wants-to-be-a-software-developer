const PubSub = require('../helpers/pub_sub.js');

const BooleanChecker = function(answer, question) {
  this.playerAnswer = answer;
  this.question = question;
  this.result = "no result";
};

BooleanChecker.prototype.checkAnswer = function() {
  const correctAnswer = this.question.correct_answer;
  if (this.playerAnswer == correctAnswer) {
    this.result = true;
  } else {this.result = false; };
};


module.exports = BooleanChecker;
