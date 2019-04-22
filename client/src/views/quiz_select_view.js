const PubSub = require('../helpers/pub_sub.js');

const QuizSelectView = function(element) {
  this.selectElement = element;
};

QuizSelectView.prototype.bindEvents = function () {
   this.selectElement.addEventListener('click', (evt) => {
    const quiz = evt.target;
    PubSub.publish('QuizSelectView:quiz-selected', quiz);
  });
};


// QuizSelectView.prototype.createQuizOption = function (question, index) {
//   const option = document.createElement('option');
//   option.textContent = quiz;
//   option.value = index;
//   return option;
//   console.log(option)
// };

module.exports = QuizSelectView;
