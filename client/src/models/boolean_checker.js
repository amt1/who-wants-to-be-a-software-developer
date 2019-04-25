const PubSub = require('../helpers/pub_sub.js');

const BooleanChecker = function(answer, question) {
  this.playerAnswer = answer;
  this.question = question;
};

BooleanChecker.prototype.checkAnswer = function() {
  const correctAnswer = this.question.correct_answer;
  const incorrectAnswer = this.question.incorrect_answers;
  if (this.playerAnswer == correctAnswer) {
    this.result = true;
  } else if (this.playerAnswer == incorrectAnswer){
    this.result = false; }
};


module.exports = BooleanChecker;
