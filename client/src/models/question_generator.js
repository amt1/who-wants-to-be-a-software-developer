const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const ScoreCounter = require('./score_counter.js');

const QuestionGenerator = function () {
  this.allQuestions = [];
  this.questionCounter = 0;
  this.scoreCounter = new ScoreCounter();
};

QuestionGenerator.prototype.bindEvents = function() {
  this.getQuestions();
};

QuestionGenerator.prototype.getQuestions = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];

    this.sendQuestion();
    this.questionCounter += 1;
  });
};

QuestionGenerator.prototype.sendQuestion = function () {
  const index = this.questionCounter;
  const question = this.allQuestions[index];

  if (question == null) {
    PubSub.publish('QuestionGenerator:no-more-questions', "END")
  };

  PubSub.publish('QuestionGenerator:question-ready', question)
  this.receiveAnswer();
  // const checkerResult = new BooleanChecker(question);
};

QuestionGenerator.prototype.receiveAnswer = function() {
  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    const resultChecker = new BooleanChecker(evt.detail);
    console.log(evt.detail);
    resultChecker.checkAnswer();
    this.respondToResult(resultChecker.result);
  });
};

QuestionGenerator.prototype.respondToResult = function (boolean) {
  PubSub.publish('QuestionGenerator:result-ready', boolean)
  this.scoreCounter.react(boolean);
};


module.exports = QuestionGenerator;
