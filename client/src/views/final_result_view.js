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

    this.answeredQuestionsArray = evt.detail[0];
    this.answerArray = evt.detail[1];
    this.playerScore = evt.detail[2];

    console.log(evt.detail);

    this.emptyQuizWrapper();
    this.renderCongrats();
    this.renderFinalScore();
    this.renderDivs();
    this.renderResults();
  });
};

FinalResultView.prototype.emptyQuizWrapper = function() {
  quizWrapper = document.querySelector('div.quiz-wrapper');
  quizWrapper.innerHTML = '';
};

FinalResultView.prototype.renderCongrats = function() {
  this.congrats = document.createElement('h2');
  this.congrats.textContent = "Congratulations! You finished the Quiz."
  this.congrats.classList.add('congrats-text');
  this.container.appendChild(this.congrats);
};

FinalResultView.prototype.renderDivs = function() {
  this.question0Div = document.createElement('div');
  this.question0Div.classList.add('question-0');
  this.container.appendChild(this.question0Div);

  this.question1Div = document.createElement('div');
  this.question1Div.classList.add('question-1');
  this.container.appendChild(this.question1Div);

  this.question2Div = document.createElement('div');
  this.question2Div.classList.add('question-2');
  this.container.appendChild(this.question2Div);

  this.question3Div = document.createElement('div');
  this.question3Div.classList.add('question-3');
  this.container.appendChild(this.question3Div);

  this.question4Div = document.createElement('div');
  this.question4Div.classList.add('question-4');
  this.container.appendChild(this.question4Div);

  this.finalScoreDiv = document.createElement('div');
  this.finalScoreDiv.classList.add('final-score');
  this.container.appendChild(this.finalScoreDiv);
};

FinalResultView.prototype.renderResults = function() {
  this.answeredQuestionsArray.forEach((question, index) => {
    questionText = document.createElement('p');
    questionText.textContent = question.question;
    const whereToAppend = document.querySelector(`div.question-${index}`);
    whereToAppend.appendChild(questionText);

  })
    this.answerArray.forEach((answer, index) => {
    playerAnswer = document.createElement('p');
    playerAnswer.textContent = answer;
    const appendTo = document.querySelector(`div.question-${index}`);
    appendTo.appendChild(playerAnswer);
  })
};

FinalResultView.prototype.renderFinalScore = function() {
  finalScoreText = document.createElement('h3');
  finalScoreText.textContent = `You answered ${this.playerScore} out of 5 questions correctly.`;
  this.container.appendChild(finalScoreText);
};

FinalResultView.prototype.renderAllResults = function (element) {
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

module.exports = FinalResultView;
