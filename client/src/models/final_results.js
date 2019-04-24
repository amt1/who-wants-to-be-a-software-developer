const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

// const FinalResults = function (button) {
const FinalResults = function () {

  this.button = button;
  this.results = [];
};

FinalResults.prototype.bindEvents = function () {

  PubSub.subscribe('QuestionGenerator:no-more-questions', (evt) => {
      // const summary = this.results;
      PubSub.publish('FinalResults:results-ready', evt.detail);
    });
};

module.exports = FinalResults;
