const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuestionFetcher = function () {
  this.url = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.url);
  this.questions = []
  this.categories = [0, 1, 2, 3, 4, 5]
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
  // PubSub.publish('QuestionFetcher:all-questions-ready', this.questions)
  PubSub.subscribe('QuizSelectView:quiz-selected', (evt) => {
    const category = evt.detail;
    this.selectQuestionsByCategory(category);
  });
};

QuestionFetcher.prototype.selectQuestionsByCategory = function (categoryIndex) {

  const filteredQuestions = this.questions.filter(question => ( question.category == this.categories[categoryIndex]));

  PubSub.publish('QuestionFetcher:questions-by-category-ready', [filteredQuestions, categoryIndex]);
  
};



module.exports = QuestionFetcher;
