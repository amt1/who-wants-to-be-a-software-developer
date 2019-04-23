const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');



const QuizCategory = function () {
  this.quizUrl = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.quizUrl);
  this.categories = [{Software Development"}, {4: "Dictionary"}, {5: "Requirements"}, {6: "Random"}];
  this.questions = []
}

QuizCategory.prototype.bindEvents = function () {
  PubSub.publish('Quiz:data-ready', this.getData);

  PubSub.subscribe('QuizSelectView:quiz-selected'), (evt) => {
    const category = evt.detail.value;
    this.getData(category);
  });
};



QuizCategory.prototype.getData = function () {
  this.request.get()
    .then((questions) => {
      this.questions = questions
      PubSub.publish('Quiz:data-loaded', questions);
    })
    .catch(console.error);
  });



//
QuziCategory.prototype.publishCategoryDetail = function (category) {
  const selectedCategory = this.getData.filter(question => (question.category == 1));
  console.log('selectedQuestions: ', selectedCategory);
  return selectedCategory;
  PubSub.publish('Quiz: QuestionReady', selectedCategory)
};
//






module.exports = QuizCategory;
