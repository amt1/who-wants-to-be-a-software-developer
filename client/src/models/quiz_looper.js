// const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizLooper = function () {
  this.questionsArray = [];
  this.loopCounter = 0;
  this.runningTotal = 0;
  this.answerResult = [];
  this.currentCategory = 0;
};

QuizLooper.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (allSelectedQuestions) => {
    // still this bit left to test
  this.questionsArray = allSelectedQuestions.detail[0];
  this.currentCategory = allSelectedQuestions.detail[1];
  this.loopCounter = this.questionsArray.length;
  for (var questionNumber = 0; questionNumber < this.loopCounter; questionNumber++) {
    // console.log('current question: ', this.questionsArray[questionNumber]);
// using a for loop in case we need the counter for any extensions later
    PubSub.publish('QuizLooper:question-ready', this.questionsArray[questionNumber]);
    PubSub.subscribe('QuizView:question-answered', (questionAndAnswer) => {
      this.answerResult = this.checkAnswer(questionAndAnswer);
      if (this.answerResult[0] == false) {
        this.addScoreToTotal(this.answerResult[1]);
      }; // end if
      PubSub.publish('QuizLooper:answer-checked', this.answerResult);
      }); // end subscribe
    }; // end for
  }); // end subscribe
}; // end bindEvents



QuizLooper.prototype.addScoreToTotal = function (score) {
  this.runningTotal += score;
};

QuizLooper.prototype.checkAnswer = function (question, answer) {
  let wrongness = 0;
  let rightness = 0;
  let result = [];
  const currentQuestion = question;
  const playersAnswer = answer;
  const wrongAnswers = [];
  let counter = playersAnswer.length;
  while (counter--) {
    if (currentQuestion.incorrect_answers.includes(playersAnswer[counter])) {
      wrongness = wrongAnswers.push(playersAnswer.splice(counter,1));
    } // end if
  }; // end while
  rightness = playersAnswer.length;
  result = [Boolean(wrongness), rightness];
  return result;
}; // end checkAnswer

module.exports = QuizLooper;
