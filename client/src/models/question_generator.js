const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const LocalScoreCounter = require('./local_score_counter.js');

const QuestionGenerator = function () {
  this.allQuestions = [];
  this.questionCounter = 0;
  this.localScoreCounter = new LocalScoreCounter();
};

QuestionGenerator.prototype.bindEvents = function() {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];

    this.prepareQuestionToSend();
  });
};

QuestionGenerator.prototype.prepareQuestionToSend = function () {
  console.log(`Counter is: ${this.questionCounter}`);
  let index = this.questionCounter;
  this.currentQuestion = this.allQuestions[index];

  if (this.currentQuestion == null) {
    console.log("GAME OVER");
    PubSub.publish('QuestionGenerator:no-more-questions', "END")
  }
  else {
    this.startSendingQuestion();
  };
};

QuestionGenerator.prototype.startSendingQuestion = function () {

  PubSub.publish('QuestionGenerator:one-question-ready', this.currentQuestion)
  this.prepareForAnswer(this.currentQuestion);
  this.questionCounter ++ ;
};

QuestionGenerator.prototype.prepareForAnswer = function(question) {
  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    const resultChecker = new BooleanChecker(evt.detail);
    resultChecker.checkAnswer();
    const realResult = resultChecker.result;
    const resultToPublish = [realResult, question];

    console.log(resultToPublish);

    PubSub.publish('QuestionGenerator:result-ready', (resultToPublish))

    this.localScoreCounter.react(realResult);
    console.log(this.questionCounter);
    this.readyForNextQuestion();
  });

};

QuestionGenerator.prototype.readyForNextQuestion = function () {
  PubSub.subscribe('ResultView:next-question', (evt) => {
    console.log("subscribed to result view");
    this.sendQuestion();
  });
};


module.exports = QuestionGenerator;
