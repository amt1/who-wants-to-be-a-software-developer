// const QuizLooper = require('./models/quiz_looper.js');
const QuestionGenerator = require('./models/question_generator.js');
const Answer = require('./models/answer.js');
const QuestionFetcher = require('./models/question_fetcher.js');
const QuizView = require('./views/quiz_view.js');
const QuizSelectView = require('./views/quiz_select_view.js');
const ResultView = require('./views/result_view.js');
const FinalResults = require('./models/final_results.js');
const FinalResultView = require('./views/final_result_view.js');
const GridView = require('./views/grid_view.js');
const UserFormView = require('./views/user_form_view.js');
const UserGridView = require('./views/user_grid_view.js');
const User = require('./models/user.js');


document.addEventListener('DOMContentLoaded', () => {

  const quizSelectViewElement = document.querySelector('nav.circle-menu');
  const quizSelectView = new QuizSelectView(quizSelectViewElement);
  quizSelectView.bindEvents();

  const answer = new Answer();
  answer.bindEvents();

  const resultViewContainer = document.querySelector('div.checkAnswers');
  const resultView = new ResultView(resultViewContainer);
  resultView.bindEvents();

  const questionFetcher = new QuestionFetcher();
  questionFetcher.getData();
  questionFetcher.bindEvents();

  const gridViewElement = document.querySelector('.quiz-wrapper');
  const gridView = new GridView(gridViewElement)
  gridView.bindEvents();

  // const quizLooper = new QuizLooper();
  // quizLooper.bindEvents();
  const finalResultView = new FinalResultView('div.final-results');
  finalResultView.bindEvents();

  const finalResults = new FinalResults();
  finalResults.bindEvents();


  const questionGenerator = new QuestionGenerator();
  questionGenerator.bindEvents();

 const userForm = document.querySelector('form#user');
 const userFormView = new UserFormView(userForm);
 userFormView.bindEvents();

 const userContainer = document.querySelector('#inp');
 const userGridView = new UserGridView(userContainer);
 userGridView.bindEvents();


 // const userUrl = 'http://localhost:3000/api/user';
 const user = new User();
 user.bindEvents();
 user.getData();


});
