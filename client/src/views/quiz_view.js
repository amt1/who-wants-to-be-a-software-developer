const PubSub = require('../helpers/pub_sub.js');


const QuizView = function(quizElement) {
  this.element = quizElement; //refers to class=Wrapper?
};

QuizView.prototype.bindEvents = function() {
  PubSub.subscribe('Quiz:question-ready', (evt) => {
    const question = evt.detail //PULL OUT QUESTION TEXT
    const possibleAnswers = evt.detail //PULL OUT ANSWERS

    // console.log(question);
    // console.log(possibleAnswers);

    // this.emptyElement();
    // this.renderQuizBox();
    // this.renderQuestion(question);
    // this.renderPossibleAnswers(possibleAnswers);
  });

  // PubSub.subscribe('Quiz:question-info-ready', (evt) => {
  //   const quizName = evt.detail // PULL OUT QUIZ NAME / CATEGORY
  //   const questionNumber = evt.detail //PULL OUT QUESTION NUMBER
  //
  //   this.renderQuizHeader(quizName, questionNumber);
  // });
};

// QuizView.prototype.emptyElement = function () {
//   this.element.innerHTML = '';
// };
//
// QuizView.prototype.renderQuizBox = function () {
//   this.quizBox = document.createElement('div');
//   this.quizBox.classList.add('quiz-box');
//   this.element.appendChild(this.quizBox);
// };
//
// QuizView.prototype.renderQuizHeader = function(quizName, questionNumber) {
//   const quizHeader = document.createElement('div');
//   quizHeader.classList.add('quiz-header');
//
//   quizName = document.createElement('div');
//   quizName.classList.add('quiz-name');
//
//   const quizNameText = document.createElement('h3');
//   quizNameText.textContent = quizName;
//   quizName.appendChild(quizNameText);
//   quizHeader.appendChild(quizName);
//
//   const questionNumber = document.createElement('div');
//   questionNumber.classList.add('question-number');
//
//   const questionNumberText = document.createElement('h3');
//   questionNumberText.textContent = questionNumber;
//   questionNumber.appendChild(questionNumberText);
//   quizHeader.appendChild(questionNumber);
//
//   this.quizBox.appendChild(quizHeader);
// };
//
// QuizView.prototype.renderQuestion = function(question) {
//   const questionText = document.createElement('p');
//   questionText.classList.add('questions');
//   questionText.textContent = question;
//   this.quizBox.appendChild(questionText);
// };
//
// QuizView.prototype.renderPossibleAnswers = function (possibleAnswers) {
//   const possibleAnswersBox = document.createElement('div');
//   possibleAnswersBox.classList.add('answers')
//   possibleAnswers.forEach((answer) => {
//     const possibleAnswer = document.createElement('div');
//     possibleAnswer.classList.add('possible-answer');
//     possibleAnswer.textContent = answer.value; //OR HOW ITS STORED!
//     possibleAnswer.addEventListener('click', function(evt) {
//       this.handleAnswerClick(evt);
//     });
//     possibleAnswersBox.appendChild(possibleAnswer);
//   });
//   this.quizBox.appendChild(possibleAnswersBox);
// };
//
// QuizView.prototype.handleAnswerClick = function(evt) {
//   const selectedAnswer = evt.target;
//   PubSub.publish('QuizView:answer-selected', selectedAnswer)
// };

module.exports = QuizView;
