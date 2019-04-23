const PubSub = require('../helpers/pub_sub.js');


const ResultView = function (container, answerContainer) {
  this.container = container;
  this.answerContainer = answerContainer;
};

ResultView.prototype.bindEvents = function () {


  PubSub.subscribe('QuestionGenerator:result-ready', (evt) => {
    const result = evt.detail[0];
    const view = this.displayResult(evt.detail[0]);

  });

  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    const question = evt.detail[1];
    const playerAnswer = evt.detail[0];
    this.populateAnswer(playerAnswer, question)
    console.log(playerAnswer);
    console.log(question);

  });

};

//  this.emptyElement(); Question View or Resuly View?
ResultView.prototype.emptyElement = function () {
  this.container.innerHTML = '';

};
ResultView.prototype.displayResult = function(result) {
  const quizContainer = document.createElement('div');
  quizContainer.class = 'result-view';

  const answer = document.createElement('p', result);
  answer.textContent = `Your answer was: ${result}`
  quizContainer.appendChild(answer);

  // const resultText = document.createElement('p');
  // resultText.textContent = result;
  // quizContainer.appendChild(resultText);



  this.container.appendChild(quizContainer);
  this.createNextButton(quizContainer);

};
//
ResultView.prototype.populateAnswer = function (playerAnswer, question) {
  const answerContainer = document.createElement('div');
  answerContainer.class = 'answer-result';

  const questionView = this.createHeading('The question was:');
  answerContainer.appendChild(questionView);

  const playerQuestion = document.createElement('p');
  playerQuestion.textContent = question.question;
  answerContainer.appendChild(playerQuestion);

  const label = document.createElement('p', question.correct_answer.slice(2, -2) );
  label.textContent= `The correct answer is: ${question.correct_answer.slice(2, -2)}`;
  answerContainer.appendChild(label);

  // const info = document.createElement('p');
  // // workaround the storedvalue in db until permanet fix
  // info.textContent = question.correct_answer.slice(2, -2);
  // answerContainer.appendChild(info);


  const moreInfo = document.createElement('p', question.link);
  moreInfo.textContent = `You can read more: ${question.link}`;
  answerContainer.appendChild(moreInfo);
  this.container.appendChild(answerContainer);

}

ResultView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};
//
ResultView.prototype.createDetail = function (text, label) {
  const detail = document.createElement('p');
  detail.textContent = `${text}: ${label}`;
  console.log(detail.textContent);
};

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
