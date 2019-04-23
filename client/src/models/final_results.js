const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const FinalResults = function (button) {
  this.button = button;
  this.results = [];
};

FinalResults.prototype.bindEvents = function () {
  PubSub.subscribe('QuizView:answer-selected', (evt) => {
    questionSelectedAnswer = evt.detail;
    this.results.push(questionSelectedAnswer);

    this.button.addEventListener('click', (evt) => {
      const summary = this.results;
      PubSub.publish('FinalResults:results-ready', summary);
    });
  });
};

module.exports = FinalResults;
