const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');


const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Answer:result-ready', (evt) => {
    const result = evt.detail;
    const view = this.displayResult(result);

  });
  PubSub.subscribe('QuestionView:answer-selected', (evt) => {
    this.emptyElement();
    const question = evt.detail[1];
    const playerAnswer = evt.detail[0];
    // this.populateAnswer(playerAnswer, question)
    this.displayResult(playerAnswer)
  });

};

// PubSub.subscribe('QuizLooper:answer-checked', (evt) => {
//   if (evt.detail == true) {
//     const result = "Correct!"
//   }
//   else {
//     const result = "Incorrect!"
//   };
//   // const view = this.displayResult(evt.detail[0]);
//   this.renderResult(result)
// });
// };

// ResultView.prototype.renderResult = function(result){
// const resultBox = document.createElement('div')
// resultBox.id = 'resultBox';
//
// const resultHead = document.createElement('h1');
// resultHead.textContent = result;
// resultHead.classList.add('quiz-name');
// resultBox.appendChild(resultHead);
//
// this.container.appendChild(resultBox);
// }

ResultView.prototype.emptyElement = function () {
  this.container.innerHTML = '';
};
ResultView.prototype.displayResult = function(result) {
  const resultBox = document.createElement('div')
  // resultBox.id = 'resultDiv';
  resultBox.classList.add('quiz-wrapper')

  const resultHead = document.createElement('p');
  resultHead.textContent = result;
  resultHead.classList.add('questions');
  resultBox.appendChild(resultHead);

  this.container.appendChild(resultBox);
  this.createNextButton(resultBox);
};

ResultView.prototype.createNextButton = function (quizContainer) {
  const button = document.createElement('button');
  button.classList.add('submit');
  button.textContent = "Next";
  quizContainer.appendChild(button);

  button.addEventListener('click', (evt) => {
    PubSub.publish('ResultView:next-question', evt);
    this.emptyElement();
    console.log("next button clicked");
  });
};
//
// ResultView.prototype.populateAnswer = function (playerAnswer, question) {
//   const answerContainer = document.createElement('div');
//   answerContainer.class = 'answer-result';
//
//   const questionView = this.createHeading('The question was:');
//   answerContainer.appendChild(questionView);
//
//   const playerQuestion = document.createElement('p');
//   playerQuestion.textContent = question.question;
//   answerContainer.appendChild(playerQuestion);
//
//   const label = document.createElement('p', question.correct_answer.slice(2, -2) );
//   label.textContent= `The correct answer is: ${question.correct_answer.slice(2, -2)}`;
//   answerContainer.appendChild(label);
//
//   const info = document.createElement('p');
//   // workaround the storedvalue in db until permanet fix
//   info.textContent = question.correct_answer.slice(2, -2);
//   answerContainer.appendChild(info);
//
//
//   const moreInfo = document.createElement('p', question.link);
//   moreInfo.textContent = `You can read more: ${question.link}`;
//   answerContainer.appendChild(moreInfo);
//   this.container.appendChild(answerContainer);
//
// }
//
// ResultView.prototype.createHeading = function (textContent) {
//   const heading = document.createElement('h3');
//   heading.textContent = textContent;
//   return heading;
// };
// //
// ResultView.prototype.createDetail = function (text, label) {
//   const detail = document.createElement('p');
//   detail.textContent = `${text}: ${label}`;
//   console.log(detail.textContent);
// };




module.exports = ResultView;
