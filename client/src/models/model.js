const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizModel = function (level, numberOfQuestions) {
  this.quizUrl = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.quizUrl);
  this.numberOfQuestions = numberOfQuestions;
  this.levels = ["easy","medium","hard"];
  this.level = level % 3;
  this.difficulty = this.levels[this.level];
  this.runningTotal = 0;
//  this.questions = this.getQuestions(this.numberOfQuestions, this.level);
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
  this.request.get()
     .then((questions) => {
       this.questions = questions;
  //     PubSub.publish('BucketList:data-loaded', bucketList);
    console.log('questions = ', this.questions);
      return this.questions;
     })
     .catch(console.error);
};

QuizModel.prototype.addScoreToTotal = function (score) {
  this.runningTotal += score;
};


QuizModel.prototype.scrollLevel = function (level) {
    return (level++) % 3;
};
QuizModel.prototype.levelUp = function (level) {
    if (level) return 2;
    return 1;
};
QuizModel.prototype.levelDown = function (level) {
  if (level<=1) return 0;
  return 1;
};

QuizModel.prototype.updateDifficulty = function (level) {
  this.difficulty = this.levels[level];
  return this.difficulty;
};

QuizModel.prototype.quizLoop = function () {

};

module.exports = QuizModel;
