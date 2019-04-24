const PubSub = require('../helpers/pub_sub.js');
const QuestionView = require('../views/question_view.js');

const QuizView = function(quizWrapper) {
  this.element = quizWrapper;
  this.questionNumber = 0
  this.allQuestions = []
};

QuizView.prototype.bindEvents = function() {
  this.allQuestions = []
  this.listenForQuestion();
};

// render .quiz-wrapper DIV
// & #quiz DIV
// & .quiz-name H1
// & .questions P
// & .answers DIV
// & .answer1 DIV
// & answer1 P
// & .answer2 DIV
// & answer2 P

QuizView.prototype.listenForQuestion = function () {

  PubSub.subscribe('QuestionGenerator:one-question-ready', (evt) => {
    const question = evt.detail
    console.log(question);

    this.allQuestions.push(question)
    this.category = question.category_name;
    console.log(this.allQuestions);

    this.questionNumber = this.allQuestions.length;
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
  quizCategory.textContent = `Category:${this.category} ---- Question Number: ${this.questionNumber}/10`;
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
