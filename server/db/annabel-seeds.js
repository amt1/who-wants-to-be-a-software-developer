use pda_hub;
db.dropDatabase();

db.pda.insertMany([
  {"category":"PDA",
  "type":"boolean",
  "difficulty":"medium",
  "question":"",
  "image":"",
  "correct_answer":"True",
  "incorrect_answers":"False",
  "URL":""
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which of the following are advantages of an agile approach?",
"image":"",
"correct_answer":{"Working software is delivered frequently", "Late changes in requirements are welcomed", "Regular adaptation to changing circumstances"},
"incorrect_answers":["The project can easily get taken off track", "No working software is produced until late during the lifecycle"],
"URL": "http://agilemanifesto.org/principles.html"
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which good practice in program design looks at the frequency and criticality of software failure, where failure is an unacceptable effect of behaviour occurring under permissible operating conditions?",
"image":"",
"correct_answer":"Reliability",
"incorrect_answers":["Efficiency", "Maintainability", "Functionality", "Usability"],
"URL": "https://practicingruby.com/articles/qualities-of-great-software"
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which two of the following are advantages of Spiral methodology?",
"image":"",
"correct_answer":["High amount of risk analysis", "Added functionality can be added later"],
"incorrect_answers":["Not a costly model to use", "Works well with smaller projects", "Software is produced later after much analysis"],
"URL": "http://tryqa.com/what-is-spiral-model-advantages-disadvantages-and-when-to-use-it/"
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which two of the following are advantages of incremental methodology?",
"image":"",
"correct_answer":["Generates working software quickly during the software life cycle", "It is easier to test and debug during smaller iteration"],
"incorrect_answers":["Not flexible - higher cost when changes are made", "Needs a clear and complete definition of the whole system"],
"URL": "http://tryqa.com/what-is-incremental-model-advantages-disadvantages-and-when-to-use-it/"
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which two of these are not functional requirements?",
"image":"",
"correct_answer":["Capacity","Recoverability"],
"incorrect_answers":["Certification requirements", "Authentication", "Administrative functions"],
"URL": "https://reqtest.com/requirements-blog/functional-vs-non-functional-requirements/"
}
,
{"category":"PDA",
"type":"multiple_choice",
"difficulty":"medium",
"question":"Which good practice in program design refers to the ease with which software can be used on computer configurations other than its current one?",
"image":"",
"correct_answer":"Portability",
"incorrect_answers":["Reliability", "Efficiency", "Functionality"],
"URL": "https://practicingruby.com/articles/qualities-of-great-software"
}

]);
