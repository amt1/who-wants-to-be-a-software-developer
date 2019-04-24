const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const Answer = require('./answer.js');
const LocalScoreCounter = require('./local_score_counter.js');

const QuestionGenerator = function () {
  this.allQuestions = [];
  // this.allAnswers = [];
  this.questionCounter = 0;
  this.localScoreCounter = new LocalScoreCounter();
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
    // this.prepareForAnswer(this.allQuestions[index]);
    this.questionCounter ++ ;
  };
};

// QuestionGenerator.prototype.prepareForAnswer = function(question) {
//   PubSub.subscribe('QuestionView:answer-selected', (evt) => {
//     this.allAnswers.push(evt.detail);
//     const resultChecker = new BooleanChecker(evt.detail, question);
//     resultChecker.checkAnswer();
//     const result = resultChecker.result;
//
//     PubSub.publish('QuestionGenerator:result-ready', result);
//
//     this.localScoreCounter.react(result);
//     this.readyForNextQuestion();
//   });
//
// };

// QuestionGenerator.prototype.readyForNextQuestion = function () {
//   PubSub.subscribe('ResultView:next-question', (evt) => {
//     const index = this.questionCounter;
//
//     if (this.questionCounter == 5) {
//       console.log("GAME OVER");
//       PubSub.publish('QuestionGenerator:no-more-questions', [this.allQuestions, this.allAnswers])
//     }
//     else {
//       PubSub.publish('QuestionGenerator:one-question-ready', this.allQuestions[index])
//       this.prepareForAnswer(this.allQuestions[index]);
//       this.questionCounter ++ ;
//     };
//   });
// };


module.exports = QuestionGenerator;
