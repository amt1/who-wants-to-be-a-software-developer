const PubSub = require('../helpers/pub_sub.js');

const QuizSelectView = function(element) {
  this.selectElement = element;
};

QuizSelectView.prototype.bindEvents = function () {
  // PubSub.subscribe('QuestionFetcher:all-questions-ready', (evt) => {
  //   const allQuestions = evt.detail;
  //   this.populateWheel(this.allCategories);
  // });

   this.selectElement.addEventListener('click', (evt) => {
    const category = evt.target.id;
    console.log(`Category is: ${category}`);

    PubSub.publish('QuizSelectView:quiz-selected', category);
    this.emptyElement();
  });
};

QuizSelectView.prototype.emptyElement = function () {
  this.selectElement.innerHTML = '';
};

module.exports = QuizSelectView;



// QuizSelectView.prototype.populateWheel = function (allCategories) {
//   console.log(allCategories);
//
//   allQuestions.forEach(( question ) => {
//     console.log("test");
//     const option = document.createElement('option');
//     option.textContent = "Test";
//     // option.value = index;
//     this.selectElement.appendChild(option);
//     console.log(option)
//   });
//
// };
