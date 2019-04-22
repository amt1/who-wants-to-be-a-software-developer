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
    PubSub.publish('Quiz:data-loaded', this.questions);
    console.log(this.questions);
  })
    .catch((err) => console.error(err));
};

QuizModel.prototype.selectQuestionsByCategory = function (category) {
  const filteredQuestions = this.questions.filter(question => ( question.category == category));
  return filteredQuestions;
};



module.exports = QuestionFetcher;
