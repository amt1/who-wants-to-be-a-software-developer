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
  let waitingForAnswer = false;

  // using a for loop in case we need the counter for any extensions later
  for (var questionNumber = 0; questionNumber < this.loopCounter; questionNumber++) {
    console.log('current question: ', this.questionsArray[questionNumber]);
    if (waitingForAnswer == false) {
    PubSub.publish('QuizLooper:question-ready', this.questionsArray[questionNumber])
    waitingForAnswer = true;
//    while (waitingForAnswer) { // logic works but crashes / hangs browser
      console.log('waiting for answer: ', waitingForAnswer);

      PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
        console.log('got answer to check: ', questionAndAnswer.detail);
        const answer = questionAndAnswer.detail[0];
        const question = questionAndAnswer.detail[1];
        this.answerResult = this.checkAnswer(question, answer);
        if (this.answerResult[0] == false) {
          this.addScoreToTotal(this.answerResult[1]);
        }; // end if
        PubSub.publish('QuizLooper:answer-checked', this.answerResult);
        waitingForAnswer = false;
        console.log('waiting for answer: ', waitingForAnswer);
// this waitingForAnswer loop seems to be working but I'm not convinced it should!
        }); // end subscribe
      }; // end if / while
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
  console.log('answer is: ', answer);
  console.log('question is: ', question);

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
