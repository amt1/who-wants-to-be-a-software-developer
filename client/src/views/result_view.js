const PubSub = require('../helpers/pub_sub.js');

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('QuizLooper:answer-checked', (evt) => {
    const view = this.displayResult(evt.detail[0]);
  });
  // PubSub.subscribe('QuizView:answer-selected', (evt) => {
  //   const question = evt.detail[1];
  //   const playerAnswer = evt.detail[0];
  //   this.populateAnswer(playerAnswer, question)
  // });
};
ResultView.prototype.displayResult = function(result) {
  const quizContainer = document.createElement('div');
  quizContainer.class = 'result-view';

  const resultText = document.createElement('p');
  resultText.textContent = result;
  quizContainer.appendChild(resultText);
  // const result = this.createHeading(reult);
  // quizContainer.appendChild(result);

  // const info = this.createDetail(text, question);
  // quizContainer.appendChild(info);
  this.container.appendChild(quizContainer);

  this.createNextButton(quizContainer);

};
//
// ResultView.prototype.populateAnswer = function (answer, question) {
//
//   const data = this.createDetail('Your score', quiz.score);
//   quizContainer.appendChild(data);
//
//   const nextButton = this.createNextButton(quiz.next_id);
//   quizContainer.appendChild(nextButton);
//
//   this.container.appendChild(quizContainer);
// };

ResultView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

ResultView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  console.log(detail.textContent);
};
//
ResultView.prototype.createNextButton = function (quizContainer) {
  const button = document.createElement('button');
  button.classList.add('submit');
  button.textContent = "Next";
  quizContainer.appendChild(button);


  button.addEventListener('click', (evt) => {
    PubSub.publish('ResultView:next-question', evt);
    console.log(evt);
  });

  return button;
};

module.exports = ResultView;
