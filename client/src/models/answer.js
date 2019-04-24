const PubSub = require('../helpers/pub_sub.js');
const BooleanChecker = require('./boolean_checker.js');

const Answer = function() {
  this.allAnswers = [];

};


// this.prepareForAnswer(this.allQuestions[index]);

Answer.prototype.bindEvents = function() {
  PubSub.subscribe('GridView:answer-selected', (evt) => {
    const playerAnswer = evt.detail[0];
    const question = evt.detail[1];

    this.allAnswers.push(playerAnswer);
    const resultChecker = new BooleanChecker(playerAnswer, question);
    resultChecker.checkAnswer();
    const result = resultChecker.result;

    PubSub.publish('Answer:result-ready', result);
    // this.localScoreCounter.react(result);
  });

};


module.exports = Answer;
