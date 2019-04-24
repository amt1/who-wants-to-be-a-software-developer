const PubSub = require('../helpers/pub_sub.js');

const GridView = function (container, question) {
  this.container = container;
  this.question = question;
  // this.element = element;
};

GridView.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (evt) => {
    this.allQuestions = evt.detail[0];
    this.category = evt.detail[1];

    this.renderAll(this.allQuestions[0])
});
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
  this.handleAnswerClick(evt);
  });

  const firstAnswerPara = document.createElement('p');
  firstAnswerPara.textContent = question.correct_answer;
  firstAnswerDiv.appendChild(firstAnswerPara);

  const secondAnswerDiv = document.createElement('div');
  secondAnswerDiv.classList.add('div');
  answersDiv.appendChild(secondAnswerDiv);

  const secondAnswerPara = document.createElement('p');
  secondAnswerPara.textContent = question.incorrect_answers;
  secondAnswerDiv.appendChild(secondAnswerPara);
  secondAnswerDiv.addEventListener('click', (evt) => {
  this.handleAnswerClick(evt);
  })

  this.container.appendChild(quizBox);
};

GridView.prototype.handleAnswerClick = function(evt) {
const selectedAnswer = evt.target.value;

  let answerObject = [];
  answerObject.push(selectedAnswer);
  answerObject.push(this.question);

  PubSub.publish('QuizView:answer-selected', answerObject)
  // this.element.innerHTML = '';
};



module.exports = GridView;
