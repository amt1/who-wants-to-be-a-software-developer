const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const Answer = require('./answer.js');

const QuestionGenerator = function () {
  this.allQuestions = [];
  this.questionCounter = 0;
  this.answerModel = new Answer();
};

QuestionGenerator.prototype.bindEvents = function() {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];

    this.sendQuestion();
  });
  PubSub.subscribe('ResultView:next-question', (evt) => {
    this.sendQuestion();
  });
};

QuestionGenerator.prototype.sendQuestion = function () {
  console.log(`Counter is: ${this.questionCounter}`);
  let index = this.questionCounter;

  if (this.questionCounter == 5) {
    console.log("GAME OVER");
    PubSub.publish('QuestionGenerator:no-more-questions', [this.allQuestions])
  }
  else {
    PubSub.publish('QuestionGenerator:one-question-ready', this.allQuestions[index])
    this.questionCounter ++ ;
  };
};

module.exports = QuestionGenerator;
