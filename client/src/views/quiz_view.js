const PubSub = require('../helpers/pub_sub.js');
const QuestionView = require('../views/question_view.js');

const QuizView = function(quizWrapper) {
  this.element = quizWrapper;
  this.questionNumber = 0
  this.allQuestions = []
};


QuizView.prototype.bindEvents = function() {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];
  });
//  this.listenForQuestion();
};

QuizView.prototype.listenForQuestion = function () {
  PubSub.subscribe('QuizLooper:question-ready', (evt) => {
    const question = evt.detail[0];
    this.questionNumber = evt.detail[1];
    this.emptyElement();
    this.renderQuizBox();
    this.renderQuizHeader();
    const questionView = new QuestionView(this.element, question)
    questionView.render();
  });

};

QuizView.prototype.emptyElement = function () {
  this.element.innerHTML = '';
};

QuizView.prototype.renderQuizBox = function () {
  this.quizDiv = document.createElement('div');
  this.quizDiv.classList.add('quiz');
  this.element.appendChild(this.quizDiv);
};

QuizView.prototype.renderQuizHeader = function() {
  quizCategory = document.createElement('h1');
  quizCategory.textContent = `Category:${this.category_name} ---- Question Number: ${this.questionNumber}/10`;
  quizCategory.classList.add('quiz-category');

  this.quizDiv.appendChild(quizCategory);
};

module.exports = QuizView;



// FOR MULTIPLE ANSWERS
// const selectedAnswer = [];
// selectedAnswer.push(evt.target.value);
//
// const answerObject = [];
// answerObject.push(selectedAnswer);
// answerObject.push(this.question);
