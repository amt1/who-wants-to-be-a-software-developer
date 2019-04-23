const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');
const ResultView = require('./result_view.js');


const FinalResultView = finction (summaryWrapper) {
  this.container = container;
};

FinalResultView.prototype.bindEvents = function (){
  PubSub.subscribe('FinalResults:results-ready', (evt) => {
    this.emptyElement();
    questionSelectedAnswerArray = evt.detail;
    questionSelectedAnswerArray.forEach(questinSelectedAnswer) => {
      const question = questionSelectedAnswer[1];
      const selectedAnswer = questionSelectedAnswer[0];
      this.renderDiv();
      this.renderResults(question, selectedAnswer);
  };
});
};

FinalResultView.prototype.renderResults = function (question, selectedAnswer) {
  const resultQuestionContainer = document.createElement('div');
  resultQuestionContainer.id = 'quiz';

  const h1 = document.createElement('h1');
  h1.textContent = `Quiz #${parseInt(question.category) + 1}`;
  h1.classList.add('quiz-name');
  resultQuestionContainer.appendChild(h1);

  const questionP = document.createElement('p');
  questionP.textContent = question.question;
  questionP.classList.add('questions');
  h1.appendChild(questionP);

  const answers = document.createElement('div');
  answers.classList.add('answers');
  h1.appendChild(answers);

  const yourAnswerDiv = document.createElement('div');
  yourAnswerDiv.classList.add('answer1');
  answers.appendChild(yourAnswerDiv);

  const yourAnswer = document.createElement('p')
  yourAnswer.textContent = `Your answer: ${selectedAnswer}`;
  yourAnswerDiv.appendChild('yourAnswer');

  const correctAnswerDiv = document.createElement('div');
  correctAnswerDiv.classList.add('answer1');
// answer1 because of the separating line below in css
  yourAnswer.appendChild('correctAnswerDiv;')

  const correctAnswer = document.createElement('p')
  yourAnswer.textContent = `Correct answer: ${question.correct_answer}`;
  correctAnswerDiv.appendChild('correctAnswer');

  const learnMoreDiv = document.createElement('div');
  learnMoreDiv.classList.add('answer2');
  correctAnswer.appendChild('learnMoreDiv');

  const learnMore = document.createElement('p');
  yourAnswer.textContent = `Learn more: ${question.link}`;
  learnMoreDiv.appendChild('learnMore')
};

FinalResultView.prototype.emptyElement = function () {
  this.element.innerHTML = '';
};

FinalResultView.prototype.renderDiv = function () {
  this.summaryContainer = document.createElement('div');
  summaryContainer.classList.add('quiz-wrapper');
  this.container.appendChild(this.summaryContainer);
};

module.exports = FinalResultView;
