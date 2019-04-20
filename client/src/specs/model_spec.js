const assert = require('assert');
const QuizModel = require('../models/model.js');

describe("QuizModel", function(){
  let quizModel;

  beforeEach(function(){
    quizModel = new QuizModel("");
  });
  it("should have a number of questions", function(){
    // Arrange
    quizModel = new QuizModel("0,2");

    // Act
    const actual = quizModel.numberOfQuestions;
    // Assert
    assert.strictEqual(actual, 2);
    // actual goes first then expected
  });
//  xit("should have a model");
// x misses out the test. skip does this in ruby.

}); // end of spec file
