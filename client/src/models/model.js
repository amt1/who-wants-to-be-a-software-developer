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
//  this.questions = this.getQuestions( this.level, this.numberOfQuestions);
this.questions = [
  {
    _id: "5cbb93be1d7658a0ee8bb5b1",
    category: "User Interface Design",
    type: "boolean",
    difficulty: 0,
    question: "A container is an example of an interface element.",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://blog.prototypr.io/how-to-teach-yourself-ux-design-31f16e41b189"
  },
  {
  _id: "5cbb93be1d7658a0ee8bb5b2",
  category: "Effective Visual Communication",
  type: "boolean",
  difficulty: 1,
  question: "There are 6 concern relating to the qualities of great software: Functionality, reliability, usability, efficiency, maintainability and portability concerns. True or false? ",
  correct_answer: "{'true'}",
  incorrect_answers: "{'false'}",
  image: "",
  link: "https://practicingruby.com/articles/qualities-of-great-software"
  }
];
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

QuizModel.prototype.getQuestions = function (difficulty, numberOfQuestions) {
  this.request.get()
     .then((questions) => {
  //     this.questions = questions;
  //     PubSub.publish('BucketList:data-loaded', bucketList);
    console.log('questions = ', questions);
//      return this.questions;
return questions;
     })
     .catch(console.error);
};

QuizModel.prototype.addScoreToTotal = function (score) {
  this.runningTotal += score;
};

QuizModel.prototype.checkAnswer = function (question, answer) {
let wrongness = 0;
let rightness = 0;
let result = [];
const currentQuestion = question;
const playersAnswer = answer;
const wrongAnswers = [];
let counter = playersAnswer.length;
while (counter--) {
  if (currentQuestion.incorrect_answers.includes(playersAnswer[counter])) {
    wrongness = wrongAnswers.push(playersAnswer.splice(counter,1));
  }
};
rightness = playersAnswer.length;
result = [Boolean(wrongness), rightness];
return result;
};

QuizModel.prototype.scrollLevel = function (level) {
    return (level+1) % 3;
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
  this.level = level % 3;
  this.difficulty = this.levels[this.level];
  return this.difficulty;
};

QuizModel.prototype.quizLoop = function () {

};

module.exports = QuizModel;
