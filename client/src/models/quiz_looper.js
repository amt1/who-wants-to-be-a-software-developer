// const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizLooper = function () {
  this.questionsArray = [];
  this.loopCounter = 0;
  this.runningTotal = 0;
  this.answerResult = [];
  this.currentCategory = 0;
};

QuizLooper.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionFetcher:questions-by-category-ready', (allSelectedQuestions) => {
    // still this bit left to test
  this.questionsArray = allSelectedQuestions.detail[0];
  this.currentCategory = allSelectedQuestions.detail[1];
  this.loopCounter = this.questionsArray.length;
console.log("loopCounter: number of questions is:", this.loopCounter);
  // using a for loop in case we need the counter for any extensions later
  // no - for loop won't complete in sequence with asynchronous processes inside it
  // use forEach instead
//  for (let questionNumber = 0; questionNumber < this.loopCounter; questionNumber++) {
this.questionsArray.forEach(this.questionLoop);
  //     console.log('current question: ', currentQuestion);
  //     if (waitingForAnswer == false) {
  // //    PubSub.publish('QuizLooper:question-ready', this.questionsArray[questionNumber])
  // PubSub.publish('QuizLooper:question-ready', currentQuestion)
  //     waitingForAnswer = true;
  //   //  while (waitingForAnswer) { // logic works but crashes / hangs browser
  //         console.log('waiting for answer: ', waitingForAnswer);
  //
  //         PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
  //           console.log('got answer to check: ', questionAndAnswer.detail);
  //           const answer = questionAndAnswer.detail[0];
  //           const question = questionAndAnswer.detail[1];
  //           this.answerResult = this.checkAnswer(question, answer);
  //           if (this.answerResult[0] == false) {
  //             this.addScoreToTotal(this.answerResult[1]);
  //           }; // end if
  //           PubSub.publish('QuizLooper:answer-checked', this.answerResult);
  //           waitingForAnswer = false;
  //           console.log('waiting for answer: ', waitingForAnswer);
  //   // this waitingForAnswer loop seems to be working but I'm not convinced it should!
  //   // ha - it 'worked' because the category only had 1 question in it! Back to the while loop
  //   // while loop won't work as it ties up the program and prevents the user actually getting the question
  //           }); // end subscribe
  //   //      }; // end while
  //
  //       }; // end if
  //   //  }; // end for

// }); // end forEach
  }); // end subscribe
}; // end bindEvents

QuizLooper.prototype.questionLoop = function (currentQuestion, loopCounter, questionsArray) {
  console.log("hello I'm in the question loop. Counter: ", loopCounter);
  console.log("questions array: ", questionsArray);
//     this.currentQuestion = question;
     let waitingForAnswer = false;
//
      console.log('current question: ', currentQuestion);
       if (waitingForAnswer == false) {
         PubSub.publish('QuizLooper:question-ready', currentQuestion)
         waitingForAnswer = true;
//     //  while (waitingForAnswer) { // logic works but crashes / hangs browser
           console.log('waiting for answer: ', waitingForAnswer);
//
           PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
             console.log('got answer to check: ', questionAndAnswer.detail);
            const answer = questionAndAnswer.detail[0];
            const question = questionAndAnswer.detail[1];
            this.answerResult = this.checkAnswer(question, answer);
            if (this.answerResult[0] == false) {
              this.addScoreToTotal(this.answerResult[1]);
            }; // end if
            PubSub.publish('QuizLooper:answer-checked', this.answerResult);
            waitingForAnswer = false;
            console.log('waiting for answer: ', waitingForAnswer);
//     // this waitingForAnswer loop seems to be working but I'm not convinced it should!
//     // ha - it 'worked' because the category only had 1 question in it! Back to the while loop
//     // while loop won't work as it ties up the program and prevents the user actually getting the question
             }); // end subscribe
//     //      }; // end while
//
         }; // end if
//     //  }; // end for
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
  console.log('answer is: ', answer);
  console.log('question is: ', question);
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
  console.log('result: ', result);
  return result;
}; // end checkAnswer

module.exports = QuizLooper;
