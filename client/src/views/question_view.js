const PubSub = require('../helpers/pub_sub.js');


const QuestionView = function(questionDiv, questionObject) {
  this.element = questionDiv;
  this.question = questionObject[0]
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

    const answerLength = answer.length;
    const answerString = answer.substring(2, (answerLength-2));

    possibleAnswer.textContent = answerString;
    possibleAnswer.value = answerString

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

  PubSub.publish('QuizView:answer-selected', answerObject)
  // this.element.innerHTML = '';
};

module.exports = QuestionView;


// const answers = document.createElement('div');
// answers.classList.add('answers');
//
// const answer1 = document.createElement('div');
// answer1.classList.add('answer1');
//
// const firstAnswer = document.createElement('p');
// firstAnswer.textContent = answer1text;
// answer1.appendChild(firstAnswer);
// answers.appendChild(answer1);
//
// const answer2 = document.createElement('div');
// answer2.classList.add('answer2');
//
// const secondAnswer = document.createElement('p');
// secondAnswer.textContent = answer2text;
// answer2.appendChild(secondAnswer);
// answers.appendChild(answer2);
