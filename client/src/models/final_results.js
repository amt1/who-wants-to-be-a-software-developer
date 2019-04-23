//function that saves object of eachquestion object from created array and the selected answer

const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const FinalResults = function (question, selectedAnswer) {
  this.question = question;
  this.selectedAnswer = selectedAnswer;
};
