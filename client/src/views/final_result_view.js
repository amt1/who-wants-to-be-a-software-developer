const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');
const ResultView = require('./result_view.js');

//needs rewritten for model

const FinalResultView = finction (summaryWrapper) {
  this.container = container;
};

FinalResultView.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.RenderDiv();
    this.emptyElement();
    this.renderContent(evt.detail[0]);
  });
  PubSub.subscribe('Quiz:answer-ready', (evt) => {
    this.emptyElement();
    this.renderContent(evt.detail);
  });
};

FinalResultView.prototype.emptyElement = function () {
  this.element.innerHTML = '';
};

FinalResultView.prototype.renderDiv = function () {
  this.summaryContainer = document.createElement('div');
  summaryContainer.classList.add('quiz');
  this.container.appendChild(this.summaryContainer);
};

FinalResultView.prototype.renderContent = function(arrayOfQuestions, result){
  arrayOfQuestions.forEach((question) => this.renderQuestion(question));

};

FinalResultView.prototype.renderQuestion = function(question) {
  const quizView = new QuizView(question);
  const div = quizView.renderQuizBox();
  this.element.appendChild(div);
};

FinalResultView.prototype.

module.exports = FinalResultView;
