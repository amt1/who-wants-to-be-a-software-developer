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
  let index = this.questionCounter;
  let question = this.allQuestions[index];

  if (question == null) {
    console.log("GAME OVER");
    PubSub.publish('QuestionGenerator:no-more-questions', "END")
  }
  else {
  PubSub.publish('QuestionGenerator:question-ready', question)
  this.prepareForAnswer(question);
  this.questionCounter ++ ;
  };
};

QuestionGenerator.prototype.prepareForAnswer = function(question) {
  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    const resultChecker = new BooleanChecker(evt.detail);
    resultChecker.checkAnswer();
    const realResult = resultChecker.result;
    const resultToPublish = [realResult, question];

    PubSub.publish('QuestionGenerator:result-ready', (resultToPublish))

    this.localScoreCounter.react(realResult);
    console.log(this.questionCounter);
    this.readyForNextQuestion();
  });

};


QuestionGenerator.prototype.readyForNextQuestion = function () {
  PubSub.subscribe('ResultView:next-question', (evt) => {
    console.log("subscribed to result view");
    // this.sendQuestion();
  });
};


module.exports = QuestionGenerator;
