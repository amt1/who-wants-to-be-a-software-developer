const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuestionFetcher = function () {
  this.url = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.url);
  this.questions = []
};

QuestionFetcher.prototype.getData = function () {
 this.request
  .get()
  .then((questions) => {
    this.questions = questions;
  })
    .catch((err) => console.error(err));
};

QuestionFetcher.prototype.bindEvents = function () {
  PubSub.subscribe('QuizSelectView:quiz-selected', (evt) => {
    const category = evt.detail;
    console.log(category);
    this.selectQuestionsByCategory(category);
  });
};

// Need to adapt this to fit with the category model
QuestionFetcher.prototype.selectQuestionsByCategory = function (category) {
  const filteredQuestions = this.questions.filter(question => ( question.category == "Dictionary"));

  PubSub.publish('QuestionFetcher:questions-by-category-ready', filteredQuestions);
  console.log(filteredQuestions);
};



module.exports = QuestionFetcher;
