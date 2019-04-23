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
  let numberOfQuestionsAnswered = 0;
  numberOfQuestionsAnswered = this.quizLoop( this.questionsArray );
//  console.log('all done, number answered: ', numberOfQuestionsAnswered);
// this doesn't happen in sequence - it gets to this line first time round with the variable undefined
// even though I've initaialised it
  }); // end subscribe
}; // end bindEvents

QuizLooper.prototype.quizLoop = function (questionsArray) {
  const loopCounter = 0;
  let currentQuestion = questionsArray[0];
  return this.questionLoop(currentQuestion, loopCounter, questionsArray);
};

QuizLooper.prototype.questionLoop = function (currentQuestion, loopCounter, questionsArray) {
  console.log("hello I'm in the question loop. Counter: ", loopCounter);
  console.log("questions array: ", questionsArray);
  const numberOfQuestions = this.questionsArray.length;

//     this.currentQuestion = question;
     let waitingForAnswer = false;
//
      console.log('current question: ', currentQuestion);
       if (waitingForAnswer == false) {
         PubSub.publish('QuizLooper:question-ready', currentQuestion)
         waitingForAnswer = true;
           console.log('waiting for answer: ', waitingForAnswer);
           PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
            const answerResult = this.processAnswer(questionAndAnswer.detail);
            PubSub.publish('QuizLooper:answer-checked', answerResult);
            loopCounter++;
              if (loopCounter < numberOfQuestions) {
                currentQuestion = questionsArray[loopCounter];
                this.questionLoop(currentQuestion, loopCounter, questionsArray);
              } else {
                console.log("LAst question answered: number ", loopCounter);
                PubSub.publish('QuizLooper:last-question-answered', loopCounter);
                return loopCounter;
              };
             }); // end subscribe
         }; // end if
 };

QuizLooper.prototype.processAnswer = function (questionAndAnswerData) {
  console.log('got answer to check: ', questionAndAnswerData);
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
// hardcode into an array until one can be sent
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
