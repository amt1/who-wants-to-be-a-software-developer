const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');



const Quiz = function () {
  this.quizUrl = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.quizUrl);
  this.categories = [{1: "UI"}, {2: "Qualities"}, {3: "Software Development"}, {4: "Dictionary"}, {5: "Requirements"}, {6: "Random"}];
}


Quiz.prototype.bindEvents = function () {
  PubSub.subscribe('QuizSelectView:quiz-selected', (evt) => {
    const itemSelected = evt.detail;
    const categorySelected = this.categories[itemSelected];
    console.log(categorySelected);

  })
  // PubSub.publish('Quiz:data-loaded',  => {
  //
  //
  // });
};

Quiz.prototype.getData = function () {
 const request = new RequestHelper(this.url);
  request.get()
    .then((quiz) => {
      PubSub.publish('Quiz:data-loaded', quiz);
    })
    .catch(console.error);

};



module.exports = Quiz;
