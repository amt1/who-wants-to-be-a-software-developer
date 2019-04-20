const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizModel = function () {
  this.url = 'http://localhost:3000/api/pda_quiz';
  this.request = new RequestHelper(this.url);
  this.numberOfQuestions = 0;
  this.difficulty = "";
  this.runningTotal = 0;
  this.questions = [];
};

QuizModel.prototype.bindEvents = function () {
  // PubSub.subscribe('BucketListItemView:delete-clicked', (evt) => {
  //   this.deleteBucketListItem(evt.detail);
  // });
  //
  // PubSub.subscribe('FormView:form-submitted', (evt) => {
  //   this.postBucketListItem(evt.detail);
  // })
};

QuizModel.prototype.getQuestions = function (this.numberOfQuestions, this.difficulty) {
  // this.request.get()
  //   .then((bucketList) => {
  //     PubSub.publish('BucketList:data-loaded', bucketList);
  //   })
  //   .catch(console.error);
};

QuizModel.prototype.quizLoop = function () {

};

module.exports = QuizModel;
