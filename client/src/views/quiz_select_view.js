const PubSub = require('../helpers/pub_sub.js');

const QuizSelectView = function(element, div) {
  this.selectElement = element;
  this.div = div;
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
    // const element = document.getElementById('menu')
     this.selectElement.innerHTML = '';

  // // const hidden = function myFunction() {
  // document.getElementById('nav.circle-menu').style.visibility = "hidden";


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
