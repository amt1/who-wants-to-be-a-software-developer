const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

// const FinalResults = function (button) {
const FinalResults = function () {

  this.button = button;
};

FinalResults.prototype.bindEvents = function () {

  PubSub.subscribe('Stats:stats-ready', (evt) => {
    console.log(evt.detail);

    //   PubSub.publish('FinalResults:results-ready', evt.detail);
    // });
});
};

module.exports = FinalResults;
