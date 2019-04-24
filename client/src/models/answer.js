const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');
const LocalScoreCounter = require('./local_score_counter.js');

const Answer = function(scoreCounter) {
  this.localScoreCounter = scoreCounter;
};

Answer.prototype.bindEvents = function() {

  PubSub.subscribe('GridView:answer-selected', (evt) => {
    const playerAnswer = evt.detail[0];
    const question = evt.detail[1];

    const resultChecker = new BooleanChecker(playerAnswer, question);
    resultChecker.checkAnswer();
    const result = resultChecker.result;

    PubSub.publish('Answer:result-ready', result);
    this.localScoreCounter.react(result);
    this.localScoreCounter.keepStats([question, playerAnswer]);
  });

};


module.exports = Answer;
