use pda_hub;
db.dropDatabase();

db.pda.insertMany([

  //Categories:
  // User Interface Design
  //Effective Visual Communication
  //Qualities of Great Software

  {
  "category": "User Interface Design",
  "type": "boolean",
  "difficulty": "easy",
  "question": "A container is an example of an interface element.",
  "correct_answer": ["true"],
  "incorrect_answers": ["false"]
  },
  {
  "category": "Effective Visual Communication",
  "type": "boolean",
  "difficulty": "medium",
  "question": "There are 6 concern relating to the qualities of great software: Functionality, reliability, usability, efficiency, maintainability and portability concerns. True or false? ",
  "correct_answer": ["true"],
  "incorrect_answers": ["false"]
  },
  {
  "category": "Qualities of Great Software",
  "type": "boolean",
  "difficulty": "medium",
  "question": "There are 6 concern relating to the qualities of great software: Functionality, reliability, usability, efficiency, maintainability and portability concerns. True or false? ",
  "correct_answer": ["true"],
  "incorrect_answers": ["false"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "easy",
  "question": "User interface design (UI design) brings together concepts from which of the following categories?",
  "correct_answer": ["interaction design", "visual design", "information architecture"],
  "incorrect_answers": ["mathematics", "machine learning"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Which of the following are NOT interface elements known as an input controls?",
  "correct_answer": ["pagination", "notifications"],
  "incorrect_answers": ["buttons", "checkboxes", "dropdown-lists"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Which of the following are NOT interface elements known as an navigational components?",
  "correct_answer": ["toggles"],
  "incorrect_answers": ["breadcrumb", "slider", "search-field", "pagination"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Which of the following are NOT interface elements known as an navigational components?",
  "correct_answer": ["toggles"],
  "incorrect_answers": ["breadcrumb", "slider", "search-field", "pagination"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Select the 3 factors that should be considered for the design of a successful user interface:",
  "correct_answer": ["development factors", "visibility factors", "acceptance factors"],
  "incorrect_answers": ["budgetary constraint factors"]
  },
  {
  "category": "User Interface Design",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which are the three fundamental principles involved in the use of visible language in user interface design?",
  "correct_answer": ["organize", "economize", "communicate"],
  "incorrect_answers": ["monetize", "surprise"]
  },
  {
  "category": "Qualities of Great Software",
  "type": "multiple",
  "difficulty": "medium",
  "question": "The gradual reduction of unexpected defects over time can be referred to as the __________ of our software?",
  "correct_answer": ["maturity"],
  "incorrect_answers": ["stability", "changeability", "testability", "performance"]
  },
  {
  "category": "Qualities of Great Software",
  "type": "multiple",
  "difficulty": "medium",
  "question": "The suitability of our software for serving its intended purpose is an example of which concern?",
  "correct_answer": ["functionality"],
  "incorrect_answers": ["reliability", "portability", "efficiency", "maintainability"]
  }



]);
