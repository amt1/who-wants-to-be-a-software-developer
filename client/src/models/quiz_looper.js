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
//  let numberOfQuestionsAnswered = 0;
//  let numberOfQuestionsAnswered = this.quizLoop( this.questionsArray );
  let finishesAfterNotReturningThis = this.quizLoop( this.questionsArray );
//  console.log('all done, number answered: ', numberOfQuestionsAnswered); // undefined - why??
// this doesn't happen in sequence - it gets to this line first time round with the variable undefined
// even though I've initaialised it
// ok that's going to annoy me. What can I usefully return if the program conitnues without waiting for it?
// maybe just something with a warning note for a name
// as I suspected, it's doing that before even answering any questions

// in any case, the program needs to go on to a stats / results / replay stage
PubSub.subscribe('QuizLooper:last-question-answered', (lastQuestionNumber) => {
  this.theVillage('You made it! Or did you? Hear the chimes of Big Ben!');
  // this would go on to the results stage
});
// will I need to destroy the QuizLooper object to re-initialise it for another round?
  }); // end subscribe
}; // end bindEvents

QuizLooper.prototype.quizLoop = function (questionsArray) {
  let loopCounter = 0;
  let currentQuestion = questionsArray[0];
  if (loopCounter <= questionsArray.length){
    console.log(loopCounter, questionsArray.length);
    loopCounter = this.questionLoop(currentQuestion, loopCounter, questionsArray);
  }; // this doesn't stop the loopcounter going over the limit and back into the loop either
  // the reason why is because it isn't coming back out to this function????
  // it isn't finishing these statements in order and isn't finishing questionloop at all.
  // let numberOfQuestionsAnswered = this.questionLoop(currentQuestion, loopCounter, questionsArray);
//  console.log('numberOfQuestionsAnswered', this.numberOfQuestionsAnswered);
  return this.numberOfQuestionsAnswered;
};

QuizLooper.prototype.questionLoop = function (currentQuestion, loopCounter, questionsArray) {
  this.numberOfQuestions = questionsArray.length;
  this.loopCounter = loopCounter;
  console.log("hello I'm in the question loop. Counter: ", this.loopCounter);

//     let waitingForAnswer = false;
// don't think we need this flag now it's only looping when called
//      console.log('current question: ', currentQuestion);
  //     if (waitingForAnswer == false) {
     if (this.loopCounter < this.numberOfQuestions) {
       console.log('this.loopCounter, this.numberOfQuestions: ', this.loopCounter, this.numberOfQuestions);
  // so once loopCounter goes over the limit it doesn't repeat this section but it still gets incremented
  // subscribe must keep looping - how do I stop it? Or is it not a problem?
         PubSub.publish('QuizLooper:question-ready', [currentQuestion, (loopCounter + 1)]);
//         waitingForAnswer = true;
//           console.log('waiting for answer: ', waitingForAnswer);
           PubSub.subscribe('QuizView:answer-selected', (questionAndAnswer) => {
            const answerResult = this.processAnswer(questionAndAnswer.detail);
            PubSub.publish('QuizLooper:answer-checked', answerResult);
    //        let waiting = true;
            PubSub.subscribe('ResultView:next-question', (evt) => {
                if (this.loopCounter < this.numberOfQuestions) {
                  this.loopCounter++;
                  nextQuestion = questionsArray[this.loopCounter];
                  this.questionLoop(nextQuestion, this.loopCounter, questionsArray);
                };
              });
             }); // end subscribe
    //     }; // end if
  } else if (this.loopCounter == this.numberOfQuestions){
    console.log("LAst question answered: number ", this.loopCounter);
    PubSub.publish('QuizLooper:last-question-answered', this.loopCounter);
    return this.loopCounter; // don't think we really need this but why is it returning as undefined??
    // I should call this function The Village. Every time I think I should be out I'm back in again.
    this.theVillage('Number 6 is Unmutual!');
  } else {
  return this.loopCounter;
  this.theVillage('I am not a number!');
// well I'm not getting to the village, but I'm still going bck into this function because of event handlers
// the really puzzling thing is something is incrementing loopCounter outside the if statement.
// where is that coming from?
};
 };

QuizLooper.prototype.theVillage = function (quote) {
    console.log(quote);
    // don't return?
};

QuizLooper.prototype.processAnswer = function (questionAndAnswerData) {
//  console.log('got answer to check: ', questionAndAnswerData);
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
