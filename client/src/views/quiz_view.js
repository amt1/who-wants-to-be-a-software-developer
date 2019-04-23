const PubSub = require('../helpers/pub_sub.js');


const QuizView = function(quizWrapper) {
  this.element = quizWrapper; //refers to class=Wrapper?
  this.questions = [];
};



QuizView.prototype.bindEvents = function() {
  PubSub.subscribe('Quiz:question-ready', (evt) => {
    const question = evt.detail //PULL OUT QUESTION TEXT
    const possibleAnswers = evt.detail //PULL OUT ANSWERS
    question.push(this.questions)
    // console.log(question);
    // console.log(possibleAnswers);

    this.emptyElement();
    this.renderQuizBox();
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

QuizView.prototype.emptyElement = function () {
  this.element.innerHTML = '';
};

QuizView.prototype.renderQuizBox = function () {
  this.quizDiv = document.createElement('div');
  this.quizDiv.classList.add('quiz');
  this.element.appendChild(this.quizDiv);
};

QuizView.prototype.renderQuizHeader = function(quizName, questionNumber) {
  quizName = document.createElement('h1');
  quizName.textContent = `${quizName} ${questionNumber}`;
  quizName.classList.add('quiz-name');

  const question = document.createElement('p');
  question.textContent = questionText;
  quizName.appendChild(question);

  const answers = document.createElement('div');
  answers.classList.add('answers');

  const answer1 = document.createElement('div');
  answer1.classList.add('answer1');

  const firstAnswer = document.createElement('p');
  firstAnswer.textContent = answer1text;
  answer1.appendChild(firstAnswer);
  answers.appendChild(answer1);

  const answer1 = document.createElement('div');
  answer2.classList.add('answer2');

  const secondAnswer = document.createElement('p');
  secondAnswer.textContent = answer2text;
  answer2.appendChild(secondAnswer);
  answers.appendChild(answer2);

  this.quizDiv.appendChild(quizName);
};
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
QuizView.prototype.handleAnswerClick = function(evt) {
  const selectedAnswer = evt.target;
  const answerObject = selectedAnswer + this.questions
  PubSub.publish('QuizView:answer-selected', answerObject)
};

module.exports = QuizView;
