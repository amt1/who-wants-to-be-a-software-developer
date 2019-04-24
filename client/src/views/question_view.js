const PubSub = require('../helpers/pub_sub.js');


const QuestionView = function(questionDiv, questionObject) {
  this.element = questionDiv;
  this.question = questionObject
  this.possibleAnswers = []
};

QuestionView.prototype.render = function() {
  this.gatherAnswers();
  this.renderQuestion();
  this.renderPossibleAnswers();
};

QuestionView.prototype.gatherAnswers = function() {
  this.possibleAnswers.push(this.question.correct_answer);
  this.possibleAnswers.push(this.question.incorrect_answers);
};

QuestionView.prototype.renderQuestion = function() {
  const questionText = document.createElement('p');
  questionText.classList.add('questions');
  questionText.textContent = this.question.question;
  this.element.appendChild(questionText);
};

QuestionView.prototype.renderPossibleAnswers = function () {
  const possibleAnswersBox = document.createElement('div');
  possibleAnswersBox.classList.add('answers')
  this.possibleAnswers.forEach((answer) => {
    const possibleAnswer = document.createElement('button');
    possibleAnswer.classList.add('answer`${answer.index}`');

    possibleAnswer.textContent = answer;
    possibleAnswer.value = answer

    possibleAnswer.addEventListener('click', (evt) => {
      this.handleAnswerClick(evt);
    });
    possibleAnswersBox.appendChild(possibleAnswer);
  });
  this.element.appendChild(possibleAnswersBox);
};

QuestionView.prototype.handleAnswerClick = function(evt) {
  const selectedAnswer = evt.target.value;

  let answerObject = [];
  answerObject.push(selectedAnswer);
  answerObject.push(this.question);

};

module.exports = QuestionView;
