const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizModel = function (level, numberOfQuestions) {
  this.quizUrl = 'http://localhost:3000/api/pda_questions';
  this.request = new RequestHelper(this.quizUrl);
  this.numberOfQuestions = numberOfQuestions;
  this.levels = ["easy","medium","hard"];
  this.level = level % 3;
  this.difficulty = this.levels[this.level];
  this.runningTotal = 0;
  this.questionsDB = this.getQuestions( this.level, this.numberOfQuestions);
  console.log('db: ', this.questionsDB);
this.fakeDB = [
  {
// copy-pasted from Insomnia - somewhere in the process it added quotes around the keys.
// I don't know if the real database will do this or not.
// They aren't there in MongoDB Compass Community so I've deleted them here
    _id: "5cbce40e18d9ea149bcfe028",
    category: "User Interface Design",
    type: "boolean",
    difficulty: 0,
    question: "A container is an example of an interface element.",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://blog.prototypr.io/how-to-teach-yourself-ux-design-31f16e41b189"
  },
  {
    _id: "5cbce40e18d9ea149bcfe029",
    category: "Qualities of Great Software",
    type: "boolean",
    difficulty: 1,
    question: "There are 6 concerns relating to the qualities of great software: Functionality, reliability, usability, efficiency, maintainability and portability concerns. True or false? ",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://practicingruby.com/articles/qualities-of-great-software"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02a",
    category: "Software Development",
    type: "boolean",
    difficulty: 0,
    image: "",
    question: "Does SDLC stand for Systematic Development Language for CRUD?",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    link: "https://www.tutorialspoint.com/sdlc/sdlc_overview.htm"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02b",
    category: "Software Development",
    type: "boolean",
    difficulty: 1,
    image: "",
    question: "Architectural Design defines the relationship among major structural elements of the program. True or false",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    link: "https://www.geeksforgeeks.org/software-engineering-architectural-design/"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02c",
    category: "Software Development",
    type: "boolean",
    difficulty: 1,
    image: "",
    question: "Procedural Design describes how the software communicates within itself, to systems that inter-operates with it and humans who use it. True or false",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    link: "https://en.wikipedia.org/wiki/Procedural_design"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02d",
    category: "Software Development",
    type: "boolean",
    difficulty: 1,
    image: "",
    question: "The primary activity during Data Design is to select logical respresentation of data objects identified during the requirements definition and specification phase. True or false",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    link: "https://en.wikipedia.org/wiki/Database_design"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02e",
    category: "Dictionary",
    type: "boolean",
    difficulty: 0,
    question: "An instance variable is a type of variable that is attached to a class.",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://www.computerhope.com/jargon/program.htm"
  },
  {
    _id: "5cbce40e18d9ea149bcfe02f",
    category: "Functional and non-functional requirements",
    type: "boolean",
    difficulty: 1,
    question: "Functional requirements describe how the system works: True or False?",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://reqtest.com/requirements-blog/functional-vs-non-functional-requirements/"
  },
  {
    _id: "5cbce40e18d9ea149bcfe030",
    category: "Functional and non-functional requirements",
    type: "boolean",
    difficulty: 1,
    question: "Functional requirements specify a behaviour or function: True or False?",
    correct_answer: "{'true'}",
    incorrect_answers: "{'false'}",
    image: "",
    link: "https://reqtest.com/requirements-blog/functional-vs-non-functional-requirements/"
  }
];


this.questions = [];

};  // end of constructor

QuizModel.prototype.bindEvents = function () {
  PubSub.subscribe('QuizSelectView:quiz-selected', (evt) => {

  });

  PubSub.publish('Quiz:question-info-ready', (evt) => {
    this.selectQuestionsByLevel(evt.detail);
  })
};

QuizModel.prototype.selectQuestionsByLevel = function (difficulty) {
  const filteredQuestions = this.fakeDB.filter(question => ( question.difficulty == difficulty));
  console.log('filteredQuestions: ', filteredQuestions);
  return filteredQuestions;
};


QuizModel.prototype.getQuestions = function (difficulty, numberOfQuestions) {

// would be good to narrow down the questions with querystring variables
// when fetching them eg http://localhost:3000/api/pda_questions?difficulty=0
// This doesn't do anything in insomnia
// however, insomnia has put quotes around the keys.
// been trying to make a route for this but it returns an empty array so far
// Also this is a minor issue compared to the current problem of the application
// not fetching from the database at all.

  this.request.get()
     .then((questions) => {
      this.questions = questions;
  //     PubSub.publish('BucketList:data-loaded', bucketList);
  //  console.log('questions = ', questions);
    const questionsByLevel = this.selectQuestionsByLevel(difficulty);
    const orderedQuestions = [];
    if (questionsByLevel.length < numberOfQuestions) {
      numberOfQuestions = questionsByLevel.length;
    };

 while (numberOfQuestions > orderedQuestions.push( questionsByLevel.splice(Math.floor(Math.random() * questionsByLevel.length), 1))){

// could put quiz loop in here

console.log('ordered questions = ', orderedQuestions);
console.log('questionsByLevel = ', questionsByLevel);
}

   console.log('randomised questions = ', orderedQuestions);
this.questions = orderedQuestions;
     return this.questions;
// return questions;
     })
     .catch(console.error);
};

QuizModel.prototype.addScoreToTotal = function (score) {
  this.runningTotal += score;
};

QuizModel.prototype.checkAnswer = function (question, answer) {
let wrongness = 0;
let rightness = 0;
let result = [];
const currentQuestion = question;
const playersAnswer = answer;
const wrongAnswers = [];
let counter = playersAnswer.length;
while (counter--) {
  if (currentQuestion.incorrect_answers.includes(playersAnswer[counter])) {
    wrongness = wrongAnswers.push(playersAnswer.splice(counter,1));
  }
};
rightness = playersAnswer.length;
result = [Boolean(wrongness), rightness];
return result;
};

QuizModel.prototype.scrollLevel = function (level) {
    return (level+1) % 3;
};
QuizModel.prototype.levelUp = function (level) {
    if (level) return 2;
    return 1;
};
QuizModel.prototype.levelDown = function (level) {
  if (level<=1) return 0;
  return 1;
};

QuizModel.prototype.updateDifficulty = function (level) {
  this.level = level % 3;
  this.difficulty = this.levels[this.level];
  return this.difficulty;
};

QuizModel.prototype.quizLoop = function () {

};

module.exports = QuizModel;
