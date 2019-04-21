use pda_quiz;
db.dropDatabase();

db.pda_questions.insertMany([
  {
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
        category: "Software Development",
      type: "boolean",
      difficulty: 0,
      image: "",
      question: "Does SDLC stand for Systematic Development Language for CRUD?",
      correct_answer: "{'true'}",
      incorrect_answers: "{'false'}",
      image: "",
      link: "https://www.tutorialspoint.com/sdlc/sdlc_overview.htm"
    },
      {
        category: "Software Development",
      type: "boolean",
      difficulty: 1,
      image: "",
      question: "Architectural Design defines the relationship among major structural elements of the program. True or false",
      correct_answer: "{'true'}",
      incorrect_answers: "{'false'}",
      image: "",
      link: "https://www.geeksforgeeks.org/software-engineering-architectural-design/"
      },
      {
        category: "Software Development",
      type: "boolean",
      difficulty: 1,
      image: "",
      question: "Procedural Design describes how the software communicates within itself, to systems that inter-operates with it and humans who use it. True or false",
      correct_answer: "{'true'}",
      incorrect_answers: "{'false'}",
      image: "",
      link: "https://en.wikipedia.org/wiki/Procedural_design"
      },
      {
        category: "Software Development",
      type: "boolean",
      difficulty: 1,
      image: "",
      question: "The primary activity during Data Design is to select logical respresentation of data objects identified during the requirements definition and specification phase. True or false",
      correct_answer: "{'true'}",
      incorrect_answers: "{'false'}",
      image: "",
      link: "https://en.wikipedia.org/wiki/Database_design"
      },
      {
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
        category: "Functional and non-functional requirements",
      type: "boolean",
      difficulty: 1,
      question: "Functional requirements specify a behaviour or function: True or False?",
      correct_answer: "{'true'}",
      incorrect_answers: "{'false'}",
      image: "",
      link: "https://reqtest.com/requirements-blog/functional-vs-non-functional-requirements/"
      },
]);


// db.pda_questions.insertMany([




     //Categories:
     // User Interface Design
     //Effective Visual Communication
     //Qualities of Great Software

//,
//
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "easy",
//   "question": "User interface design (UI design) brings together concepts from which of the following categories?",
//   "correct_answer": ["interaction design", "visual design", "information architecture"],
//   "incorrect_answers": ["mathematics", "machine learning"]
//   },
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "easy",
//   "question": "Which of the following are NOT interface elements known as an input controls?",
//   "correct_answer": ["pagination", "notifications"],
//   "incorrect_answers": ["buttons", "checkboxes", "dropdown-lists"]
//   },
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "easy",
//   "question": "Which of the following are NOT interface elements known as an navigational components?",
//   "correct_answer": "toggles",
//   "incorrect_answers": ["breadcrumb", "slider", "search-field", "pagination"]
//   },
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "easy",
//   "question": "Which of the following are NOT interface elements known as an navigational components?",
//   "correct_answer": ["toggles"],
//   "incorrect_answers": ["breadcrumb", "slider", "search-field", "pagination"]
//   },
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "medium",
//   "question": "Select the 3 factors that should be considered for the design of a successful user interface:",
//   "correct_answer": ["development factors", "visibility factors", "acceptance factors"],
//   "incorrect_answers": ["budgetary constraint factors"]
//   },
//   {
//   "category": "User Interface Design",
//   "type": "multiple",
//   "difficulty": "medium",
//   "question": "Which are the three fundamental principles involved in the use of visible language in user interface design?",
//   "correct_answer": ["organize", "economize", "communicate"],
//   "incorrect_answers": ["monetize", "surprise"]
//   },
//   {
//   "category": "Qualities of Great Software",
//   "type": "multiple",
//   "difficulty": "medium",
//   "question": "The gradual reduction of unexpected defects over time can be referred to as the __________ of our software?",
//   "correct_answer": ["maturity"],
//   "incorrect_answers": ["stability", "changeability", "testability", "performance"]
//   },
//   {
//   "category": "Qualities of Great Software",
//   "type": "multiple",
//   "difficulty": "medium",
//   "question": "The suitability of our software for serving its intended purpose is an example of which concern?",
//   "correct_answer": ["functionality"],
//   "incorrect_answers": ["reliability", "portability", "efficiency", "maintainability"]
// },
// {"category":"software development",
// "type":"boolean",
// "difficulty":"easy",
// "image":"/waterfall.png"
// "question":"Does attached picture display the agile development model?",
// "correct_answer":"False",
// "incorrect_answer":"True"
// },
// {"category":"software development",
// "type":"boolean",
// "difficulty":"easy",
// "image":"/SDLC.png"
// "question":"Does attached picture display all stages of Software Development Life Cycle?",
// "correct_answer":"True",
// "incorrect_answer":"False"
// },
//
//
//
// {
// "category": "Dictionary",
// "type": "multiple",
// "difficulty": "medium",
// "question": "What is a data dictionary?",
// "correct_answer": "A collection of data about data.",
// "incorrect_answers": [
// "A list of terms regarding data with descriptions.",
// "The container of grouped data.",
// "A popular database app."
// ]
// },
//
// {
// "category": "Dictionary",
// "type": "multiple",
// "difficulty": "medium",
// "question": "Which of the following is NOT an attribute of a data element?",
// "correct_answer": "Value",
// "incorrect_answers": [
// "Aliases or synonyms",
// "Parent structure",
// "Description"
// ]
// },
//
// {
// "category": "Dictionary",
// "type": "multiple",
// "difficulty": "easy",
// "question": "The term ‘to instantiate’ refers to:",
// "correct_answer": "Creating an object from a class.",
// "incorrect_answers": [
// "Defining a prototype function.",
// "Shortening code for ease of editing.",
// "Locating an object within a database."
// ]
// },
//
// {
// "category": "Dictionary",
// "type": "multiple",
// "difficulty": "easy",
// "question": "An object is defined as:",
// "correct_answer": "A value created from a class.",
// "incorrect_answers": [
// "A collection of values.",
// "An inanimate item.",
// "A hash."
// ]
// },
//

//
// "category": "Functional and non-functional requirements",
// "type": "multiple",
// "difficulty": "medium",
// "question": "Which group is an example of non-functional requirements?",
// "correct_answer": "Usability, Reliability, Performance, Supportability",
// "incorrect_answers": [
// "Clarity, Scalability, Vairability, Accuracy",
// "Verifiability, Readability, Functionality, Accessibility",
// "Changeability, Maintainability, Precision, Simplicity"
// ]
// },
//
// "category": "Functional and non-functional requirements",
// "type": "multiple",
// "difficulty": "hard",
// "question": "Which of the following examples does NOT qualify as a functional requirement?",
// "correct_answer": "Security",
// "incorrect_answers": [
// "Historical data",
// "Authentication",
// "Authorization levels"
// ]
// },
//

//
// "category": "Functional and non-functional requirements",
// "type": "multiple",
// "difficulty": "hard",
// "question": "What is the difference between functional and non-functional requirements?",
// "correct_answer": "Non-functional requirements describe how the system works, while functional requirements describe what the system should do",
// "incorrect_answers": [
// "Non-functional requirements describe the framework used, while functional requirements describe the essential functions of an application.",
// "Non-functional requirements describe front-end aspects, while functional requirements describe the back-end of an application.",
// "Non-functional requirements describe testing and in-code comments, while functional requirements describe logic and server code."
// ]
// },
