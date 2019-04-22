const PubSub = require('../helpers/pub_sub.js');

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:answer-ready', (evt) => {
    this.populateAnswer(evt.detail);
  });
};
ResultView.prototype.populateAnswer = function (quiz) {
  const quizContainer = document.createElement('div');
  quizContainer.id = 'quiz';

  const result = this.createHeading(quiz.personAnswer);
  quizContainer.appendChild(result);

  const info = this.createDetail('Info', quiz.correctAnswer);
  quizContainer.appendChild(info);

  const data = this.createDetail('Data', quiz.score);
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
