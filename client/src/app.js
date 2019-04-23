const QuizModel = require('./models/model.js');
const QuizView = require('./views/quiz_view.js');
const QuizSelectView = require('./views/quiz_select_view.js');
const ResultView = require('./views/result_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const quizSelectViewElement = document.querySelector('#quiz-selector'); //NOT SURE WHICH HTML ELEMENT TO PUT IN HERE
  const quizSelectView = new QuizSelectView(quizSelectViewElement);
  quizSelectView.bindEvents();

  const quizViewElement = document.querySelector('#quiz');
  const quizView = new QuizView(quizViewElement);
  quizView.bindEvents();

  const resultViewContainer = document.querySelector('div.checkAnswers');
  const resultView = new ResultView(resultViewContainer);
  resultView.bindEvents();

  const quizLooper = new QuizLooper();
  quizLooper.bindEvents();

});
