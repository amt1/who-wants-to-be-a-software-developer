const PubSub = require('../helpers/pub_sub.js');

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  // PubSub.subscribe('QuizLooper:answer-checked', (evt) => {
  //   this.displayResult("true");
  //   const result = evt.detail[0]
  //   console.log(result)
  // });
  PubSub.subscribe('QuizView:answer-selected', (evt) => {
    const question = evt.detail[1];
    const playerAnswer = evt.detail[0];
    this.populateAnswer(playerAnswer, question)
  });
};
ResultView.prototype.displayResult = function(result) {

};

ResultView.prototype.populateAnswer = function (answer, question) {
  const quizContainer = document.createElement('div');
  quizContainer.id = 'result-view';

  const result = this.createHeading(result);
  quizContainer.appendChild(result);

  const info = this.createDetail('Your answer', quiz.correctAnswer);
  quizContainer.appendChild(info);

  const data = this.createDetail('Your score', quiz.score);
  quizContainer.appendChild(data);

  const nextButton = this.createNextButton(quiz.next_id);
  quizContainer.appendChild(nextButton);

  this.container.appendChild(quizContainer);
};

ResultView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

ResultView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};

ResultView.prototype.createDeleteButton = function (quizId) {
  const button = document.createElement('button');
  button.classList.add('submit');
  button.value = quizId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('ResultView:next-question', evt.target.value);
  });

  return button;
};

module.exports = ResultView;
