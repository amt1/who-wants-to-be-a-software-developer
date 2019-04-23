const QuizModel = require('./models/model.js');
const QuizView = require('./views/quiz_view.js');
const QuizSelectView = require('./views/quiz_select_view.js');
const ResultView = require('./views/result_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const quizSelectViewElement = document.querySelector('#quiz-select'); //NOT SURE WHICH HTML ELEMENT TO PUT IN HERE
  const quizSelectView = new QuizSelectView(quizSelectViewElement);
  quizSelectView.bindEvents();

  const quizViewElement = document.querySelector('#quiz');
  const quizView = new QuizView(quizViewElement);
  quizView.bindEvents();

  const resultViewContainer = document.querySelector('div.checkAnswers');
  const resultView = new ResultView(resultViewContainer);
  resultView.bindEvents();

<<<<<<< HEAD
  const quizLooper = new QuizLooper();
  quizLooper.bindEvents();
=======
  const quizModel = new QuizModel(0,2);
  // quiz.getData();
  // quiz.bindEvents();
>>>>>>> 015cb2d09a5fc697faf8fdfd8586fdfd120a6404

});
