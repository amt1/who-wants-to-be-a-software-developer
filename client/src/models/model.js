const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizModel = function (level, numberOfQuestions) {
  this.quizUrl = 'http://localhost:3000/api/pda_questions';
  this.quizRequest = new RequestHelper(this.quizUrl);
  this.numberOfQuestions = numberOfQuestions;
  this.levels = ["easy","medium","hard"];
  this.level = level % 3;
  this.difficulty = this.levels[this.level];
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

QuizModel.prototype.getQuestions = function (numberOfQuestions, difficulty) {
  // this.request.get()
  //   .then((bucketList) => {
  //     PubSub.publish('BucketList:data-loaded', bucketList);
  //   })
  //   .catch(console.error);
};

QuizModel.scrollLevel = function (level) {
    return (level++) % 3;
};
QuizModel.levelUp = function (level) {
    if (level) return 2;
    return 1;
};
QuizModel.levelDown = function (level) {
    return (level--) % 3;
};

QuizModel.prototype.quizLoop = function () {

};

module.exports = QuizModel;
