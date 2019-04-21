<<<<<<< HEAD
// const PubSub = require('../helpers/pub_sub.js');
//
// const QuizSelectView = function(element) {
//   this.element = element;
// };
//
// QuizSelectView.prototype.bindEvents = function () {
//   PubSub.subscribe('Quiz:quizes-ready', (evt) => {
//     this.populateQuiz(evt.detail);
//   });
//    this.selectElement.addEventListener('submit', (evt) => {
//     const quiz = evt.target;
//     PubSub.publish('QuizSelectView:quiz-selected', quiz);
//   });
// };
//
// QuizSelectView.prototype.populateQuiz = function (quizes) {
//   quizes.forEach((question, index) => {
//     const option = this.createQuizOption(question, index);
//     this.selectElement.appendChild(option);
//   })
// };
//
// QuizSelectView.prototype.createQuizOption = function (question, index) {
//   const option = document.createElement('option');
//   option.textContent = quiz;
//   option.value = index;
//   return option;
//   console.log(option)
// };
// module.exports = QuizSelectView;
=======
const PubSub = require('../helpers/pub_sub.js');

const QuizSelectView = function(element) {
  this.element = element;
};

QuizSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:quizes-ready', (evt) => {
    this.populateQuiz(evt.detail);
  });
   this.selectElement.addEventListener('submit', (evt) => {
    const quiz = evt.target;
    PubSub.publish('QuizSelectView:quiz-selected', quiz);
  });
};

QuizSelectView.prototype.populateQuiz = function (quizes) {
  quizes.forEach((question, index) => {
    const option = this.createQuizOption(question, index);
    this.selectElement.appendChild(option);
  })
};

QuizSelectView.prototype.createQuizOption = function (question, index) {
  const option = document.createElement('option');
  option.textContent = quiz;
  option.value = index;
  return option;
  console.log(option)
};
module.exports = QuizSelectView;
>>>>>>> origin/feature/quizselectview
