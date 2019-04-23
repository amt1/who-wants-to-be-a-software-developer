const assert = require('assert');
const QuizLooper = require('../client/src/models/quiz_looper.js');

describe("quiz_looper", function(){
  let quizLooper;

  beforeEach(function(){
    quizLooper = new QuizLooper();
  //  quizLooper.bindEvents();
  // causes ReferenceError: document is not defined
  // can I test PubSub here or not?
  }); // end beforeEach

  it ("should add each score to a running total", function() {
      // Arrange
    //  quizLooper = new QuizLooper;

      // Act
      const actual = quizLooper.runningTotal;
      quizLooper.addScoreToTotal(5);
      const updated = quizLooper.runningTotal;
      quizLooper.addScoreToTotal(5);
      // Assert
      assert.strictEqual(actual, 0);
      assert.strictEqual(updated, 5);

      // actual goes first then expected
    }); // end running total test

    it("should check if the answer is correct and return a score", function(){
      // Arrange
      let isItWrong1 = false;
      let isItWrong2 = true;
      let isItWrong3 = false;
      let isItWrong4 = true;

      let howRightIsIt1 = 4;
      let howRightIsIt2 = 4;
      let howRightIsIt3 = 4;
      let howRightIsIt4 = 4;


      const question = {
        _id: "5cbb93be1d7658a0ee8bb5b1",
        category: "User Interface Design",
        type: "boolean",
        difficulty: 0,
        question: "A container is an example of an interface element.",
        correct_answer: "{'true'}",
    //   incorrect_answers: "{'false'}",
        incorrect_answers: "{'false', 'true'}",
        image: "",
        link: "https://blog.prototypr.io/how-to-teach-yourself-ux-design-31f16e41b189"
      };
      const veryRightAnswer = ['true', 'very true'];
      const rightAnswer = ['true'];
      const wrongAnswer = ['false'];
      const beyondRightAnswer = ['only true stuff here', 'very true', 'only a bit true'];

      // Act
      isItWrong1 = quizLooper.checkAnswer(question, rightAnswer)[0];
      isItWrong2 = quizLooper.checkAnswer(question, wrongAnswer)[0];
       isItWrong3 = quizLooper.checkAnswer(question, veryRightAnswer)[0];
      isItWrong4 = quizLooper.checkAnswer(question, beyondRightAnswer)[0];
      howRightIsIt4 = quizLooper.checkAnswer(question, beyondRightAnswer)[1];
     howRightIsIt1 = quizLooper.checkAnswer(question, rightAnswer)[1];
      howRightIsIt2 = quizLooper.checkAnswer(question, wrongAnswer)[1];
      howRightIsIt3 = quizLooper.checkAnswer(question, veryRightAnswer)[1];
      // Assert
      // with only 'false' in incorrect_answers
      // assert.strictEqual(isItWrong1, false);
      // assert.strictEqual(isItWrong2, true);
      // assert.strictEqual(isItWrong3, false);
      // assert.strictEqual(howRightIsIt1, 1);
      // assert.strictEqual(howRightIsIt2, 0);
      // assert.strictEqual(howRightIsIt3, 2);

      // with ['false','true'] in incorrect_answers
      assert.strictEqual(isItWrong1, true);
      assert.strictEqual(isItWrong2, true);
      assert.strictEqual(isItWrong3, true);
      assert.strictEqual(howRightIsIt3, 1);
      assert.strictEqual(isItWrong4, false);
      assert.strictEqual(howRightIsIt4, 3);
      assert.strictEqual(howRightIsIt1, 0);
      assert.strictEqual(howRightIsIt2, 0);


      // actual goes first then expected
    });

}); // end describe
