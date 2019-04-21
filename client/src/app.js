// const QuizSelectView = require('./views/quiz_select_view.js');
// const QuizView = require('./views/quiz-view.js');
 const QuizModel = require('./models/model.js');

document.addEventListener('DOMContentLoaded', () => {
console.log("Hello from PDA Quiz!");
  // form view first


// list view


// model
  const quizModel = new QuizModel(0,2);
//   quizModel.bindEvents();
   quizModel.getQuestions();
});
