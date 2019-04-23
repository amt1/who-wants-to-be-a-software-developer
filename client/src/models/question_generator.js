const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const LocalScoreCounter = require('./local_score_counter.js');

const QuestionGenerator = function () {
  this.allQuestions = [];
  this.questionCounter = 0;
  this.localScoreCounter = new LocalScoreCounter();
};

QuestionGenerator.prototype.bindEvents = function() {
  this.getQuestions();
};

QuestionGenerator.prototype.getQuestions = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];

    this.sendQuestion();
  });
};

QuestionGenerator.prototype.sendQuestion = function () {
  console.log(`Counter is: ${this.questionCounter}`);
  const index = this.questionCounter;
  const question = this.allQuestions[index];

  if (question == null) {
    console.log("GAME OVER");
    PubSub.publish('QuestionGenerator:no-more-questions', "END")
  }
  else {
  PubSub.publish('QuestionGenerator:question-ready', question)
  this.receiveAnswer(question);
  this.questionCounter ++ ;
  };
};

QuestionGenerator.prototype.receiveAnswer = function(question) {
  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    const resultChecker = new BooleanChecker(evt.detail);
    resultChecker.checkAnswer();
    const resultToPublish = [resultChecker.result, question]
    this.respondToResult(resultToPublish);
  });
};

QuestionGenerator.prototype.respondToResult = function ([boolean, question]) {
  this.readyForNextQuestion();
  PubSub.publish('QuestionGenerator:result-ready', [boolean, question])
  this.localScoreCounter.react(boolean);
  console.log(this.localScoreCounter.score);

};

QuestionGenerator.prototype.readyForNextQuestion = function () {
  PubSub.subscribe('ResultView:next-question', (evt) => {

    this.sendQuestion();
  });
};


module.exports = QuestionGenerator;
