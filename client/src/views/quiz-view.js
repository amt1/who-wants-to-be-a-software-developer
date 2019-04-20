const PubSub = require('../helpers/pub_sub.js')


const QuizView = function(quizElement) {
  this.element = quizElement;
};

QuizView.prototype.bindEvents = function() {
  PubSub.subscribe('Quiz:question-ready', (evt) => {
    const question = evt.detail //PULL OUT QUESTION TEXT
    const possibleAnswers = evt.detail //PULL OUT ANSWERS

    this.emptyElement();
    this.renderQuizBox();
    this.renderQuestion(question);
    this.renderPossibleAnswers(possibleAnswers);
  });

  PubSub.subscribe('Quiz:question-info-ready' (evt) => {
    const quizName = evt.detail // PULL OUT QUIZ NAME / CATEGORY
    const questionNumber = evt.detail //PULL OUT QUESTION NUMBER

    this.renderQuizHeader(quizName, questionNumber);
  });
}

QuizView.prototype.emptyElement = function () {
  this.element.innerHTML = '';
};

QuizView.prototype.renderQuizHeader = function(quizName, questionNumber) {
  const quizBox = document.querySelector('.quiz-box');
  const quizHeader = document.createElement('div');
  quizHeader.classList.add('quiz-header');

  const quizName = document.createElement('div');
  quizName.classList.add('quiz-name');

  const quizNameText = document.createElement('h3');
  quizNameText.textContent = quizName;
  quizName.appendChild(quizNameText);
  quizHeader.appendChild(quizName);

  const questionNumber = document.createElement('div');
  questionNumber.classList.add('question-number');

  const questionNumberText = document.createElement('h3');
  questionNumberText.textContent = questionNumber;
  questionNumber.appendChild(questionNumberText);
  quizHeader.appendChild(questionNumber);

  quizBox.appendChild(quizHeader);
};

QuizView.prototype.renderQuizBox = function () {
  const quizBox = document.createElement('div');
  quizBox.classList.add('quiz-box');
  this.element.appendChild(quizBox),
};

QuizView.prototype.renderQuestion = function(question) {
  const quizBox = document.querySelector('.quiz-box');
  const questionText = document.createElement('h2');
  questionText.classList.add('question-text');
  questionText.textContent = question;
  quizBox.appendChild(questionText);
};

QuizView.prototype.renderPossibleAnswers = function (possibleAnswers) {
  const quizBox = document.querySelector('.quiz-box');
  const possibleAnswersBox = document.createElement('div');
  possibleAnswers.forEach((answer) => {
    const possibleAnswer = document.createElement('div');
    possibleAnswer.classList.add('possible-answer');
    possibleAnswer.textContent = answer.value; //OR HOW ITS STORED!
    possibleAnswer.addEventListener('click', function(evt) {
      this.handleAnswerClick(evt);
    });
    possibleAnswersBox.appendChild(possibleAnswer);
  });
  quizBox.appendChild(possibleAnswersBox);
};

QuizView.prototype.handleAnswerClick = function(evt) {
  const selectedAnswer = evt.target;
  PubSub.publish('QuizView:answer-selected', selectedAnswer)
};

module.exports = QuizView;
