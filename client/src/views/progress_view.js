const PubSub = require('../helpers/pub_sub.js');

const ProgressView = function (answer) {
  this.answer = answer;
};

ProgressView.prototype.bindEvents = function () {
  PubSub.subscribe('QuizLooper:answer-checked', (evt) => {
    const progress = document.getElementById("progress-tasks-percentage");
    if (evt.detail[0] === True || evt.detail[1] === 0) {


    } else {

    }
  })
};


module.exports = ProgressView;
