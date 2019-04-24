const PubSub = require('../helpers/pub_sub.js');

const QuizLooper = function () {
  this.questionsArray = [];
  this.runningTotal = 0;
  this.answerResult = [];
  this.currentCategory = 0;
};

QuizLooper.prototype.bindEvents = function () {
      PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (allSelectedQuestions) => {
      this.questionsArray = allSelectedQuestions.detail[0];
      this.currentCategory = allSelectedQuestions.detail[1];
      let finishesAfterNotReturningThis = this.quizLoop( this.questionsArray );
      PubSub.subscribe('QuizLooper:last-question-answered', (lastQuestionNumber) => {
    });
  }); // end subscribe
}; // end bindEvents

QuizLooper.prototype.quizLoop = function (questionsArray) {
  let loopCounter = 0;
  let currentQuestion = questionsArray[0];
  if (loopCounter <= questionsArray.length){
    loopCounter = this.questionLoop(currentQuestion, loopCounter, questionsArray);
  };
  return this.numberOfQuestionsAnswered;
};

QuizLooper.prototype.questionLoop = function (currentQuestion, loopCounter, questionsArray) {
  this.numberOfQuestions = questionsArray.length;
  this.loopCounter = loopCounter;
     if (this.loopCounter < this.numberOfQuestions) {
         PubSub.publish('QuizLooper:question-ready', [currentQuestion, (loopCounter + 1)]);
           PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
            const answerResult = this.processAnswer(questionAndAnswer.detail);
            PubSub.publish('QuizLooper:answer-checked', answerResult);
            PubSub.subscribe('ResultView:next-question', (evt) => {
                if (this.loopCounter < this.numberOfQuestions) {
                  this.loopCounter++;
                  nextQuestion = questionsArray[this.loopCounter];
                  this.questionLoop(nextQuestion, this.loopCounter, questionsArray);
                };
              });
             }); // end subscribe
  } else if (this.loopCounter == this.numberOfQuestions){
    PubSub.publish('QuizLooper:last-question-answered', this.loopCounter);
    return this.loopCounter;
  } else {
  return this.loopCounter;
};
 };

QuizLooper.prototype.theVillage = function (quote) {
    console.log(quote);
};

QuizLooper.prototype.processAnswer = function (questionAndAnswerData) {
 const answer = questionAndAnswerData[0];
 const question = questionAndAnswerData[1];
 this.answerResult = this.checkAnswer(question, answer);
 if (this.answerResult[0] == false) {
   this.addScoreToTotal(this.answerResult[1]);
 }; // end if
 return this.answerResult;
};

QuizLooper.prototype.addScoreToTotal = function (score) {
  this.runningTotal += score;
};

QuizLooper.prototype.checkAnswer = function (question, answer) {
  let wrongness = 0;
  let rightness = 0;
  let result = [];
  let playersAnswer = [];
  const currentQuestion = question;
//  const playersAnswer = answer.value;
  playersAnswer.push(answer);
  const wrongAnswers = [];
  let counter = playersAnswer.length;
  while (counter--) {
    if (currentQuestion.incorrect_answers.includes(playersAnswer[counter])) {
      wrongness = wrongAnswers.push(playersAnswer.splice(counter,1));
    } // end if
  }; // end while
  rightness = playersAnswer.length;
  result = [Boolean(wrongness), rightness];
  return result;
}; // end checkAnswer

module.exports = QuizLooper;
