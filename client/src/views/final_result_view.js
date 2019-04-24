const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');
const ResultView = require('./result_view.js');


const FinalResultView = function (container) {
  this.container = container;
  this.answeredQuestionsArray = [];
  this.answerArray = [];
};

FinalResultView.prototype.bindEvents = function (){
  PubSub.subscribe('FinalResults:results-ready', (evt) => {

    this.emptyQuizBox();

    this.answeredQuestionsArray = evt.detail[0];
    this.answerArray = evt.detail[1];
    this.playerScore = evt.detail[2];
    console.log(evt.detail);

    this.answeredQuestionsArray.forEach((question) => {this.renderResults(question)})
    this.answerArray.forEach((answer) => {this.renderResults(answer)})
  });
};

FinalResultView.prototype.emptyQuizBox = function() {
  quizWrapper = document.querySelector('div.quiz-wrapper');
  quizWrapper.innerHTML = '';
};

FinalResultView.prototype.renderResults = function (element) {
  const text = document.createElement('p');
  text.textContent = element
  this.container.appendChild(text);

  // const resultQuestionContainer = document.createElement('div');
  // console.log(resultQuestionContainer)
  // resultQuestionContainer.id = 'final-results';
  //
  // const heading = document.createElement('h1');
  //  heading.textContent = question.category_name
  // heading.classList.add('quiz-name');
  // resultQuestionContainer.appendChild(heading);

//   const questionP = document.createElement('p');
//   questionP.textContent = question.question;
//   questionP.classList.add('questions');
//   h1.appendChild(questionP);
//
//   const answers = document.createElement('div');
//   answers.classList.add('answers');
//   h1.appendChild(answers);
//
//   const yourAnswerDiv = document.createElement('div');
//   yourAnswerDiv.classList.add('answer1');
//   answers.appendChild(yourAnswerDiv);
//
//   const yourAnswer = document.createElement('p')
//   yourAnswer.textContent = `Your answer: ${selectedAnswer}`;
//   yourAnswerDiv.appendChild(yourAnswer);
//
//   const correctAnswerDiv = document.createElement('div');
//   correctAnswerDiv.classList.add('answer1');
// // answer1 because of the separating line below in css
//   yourAnswer.appendChild(correctAnswerDiv)
//
//   const correctAnswer = document.createElement('p')
//   yourAnswer.textContent = `Correct answer: ${question.correct_answer}`;
//   correctAnswerDiv.appendChild(correctAnswer);
//
//   const learnMoreDiv = document.createElement('div');
//   learnMoreDiv.classList.add('answer2');
//   correctAnswer.appendChild(learnMoreDiv);
//
//   const learnMore = document.createElement('p');
//   yourAnswer.textContent = `Learn more: ${question.link}`;
//   learnMoreDiv.appendChild(learnMore)

  // this.container.appendChild(resultQuestionContainer);
};

FinalResultView.prototype.emptyElement = function () {
  this.container.innerHTML = '';
};

FinalResultView.prototype.renderDiv = function () {
  this.summaryContainer = document.createElement('div');
  this.summaryContainer.classList.add('quiz-wrapper');
  this.container.appendChild(this.summaryContainer);
};

module.exports = FinalResultView;
