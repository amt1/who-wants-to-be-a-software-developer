const PubSub = require('../helpers/pub_sub.js');

const GridView = function (container) {
  this.container = container;
};

  GridView.prototype.bindEvents = function () {
    PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
      this.allQuestions = evt.detail[0];
      this.category = evt.detail[1];
      this.renderAll(this.allQuestions[0]);
      // this.emptyElement();
    });

    PubSub.subscribe('QuestionGenerator:one-question-ready', (evt) => {
    this.emptyElement();
    this.renderAll(evt.detail)

    });
};

GridView.prototype.emptyElement = function () {
  // this.element = element;
  this.container.innerHTML = '';
};

GridView.prototype.renderAll = function (question) {
  const quizBox = document.createElement('div');
  quizBox.id = 'quizBox';

  const header = document.createElement('h1')
  header.textContent = question.category_name;
  header.classList.add('quiz-name');
  quizBox.appendChild(header);

  const questionParagraph = document.createElement('p');
  questionParagraph.textContent = question.question;
  questionParagraph.classList.add('questions');
  header.appendChild(questionParagraph);

  const answersDiv = document.createElement('div');
  answersDiv.classList.add('answers');
  questionParagraph.appendChild(answersDiv);

  const firstAnswerDiv = document.createElement('div');
  firstAnswerDiv.classList.add('answer1');
  answersDiv.appendChild(firstAnswerDiv);
  firstAnswerDiv.addEventListener('click', (evt) => {
  this.handleAnswerClick(evt, question);
  });

  const firstAnswerPara = document.createElement('p');
  firstAnswerPara.textContent = question.correct_answer;
  firstAnswerPara.value = question.correct_answer;
  firstAnswerDiv.appendChild(firstAnswerPara);

  const secondAnswerDiv = document.createElement('div');
  secondAnswerDiv.classList.add('answer2');
  answersDiv.appendChild(secondAnswerDiv);

  const secondAnswerPara = document.createElement('p');
  secondAnswerPara.textContent = question.incorrect_answers;
  secondAnswerPara.value = question.incorrect_answers;
  secondAnswerDiv.appendChild(secondAnswerPara);
  secondAnswerDiv.addEventListener('click', (evt) => {
  this.handleAnswerClick(evt, question);
  })

  // this.container.appendChild(quizBox);

  this.container.appendChild(quizBox);
};

GridView.prototype.handleAnswerClick = function(evt, question) {
const selectedAnswer = evt.target.value;

  PubSub.publish('GridView:answer-selected', [selectedAnswer, question])
  // this.element.innerHTML = '';

};



module.exports = GridView;
