// const express = require('express');
// const app = express();
//
// app.use(express.static('client/public'));
//
// app.listen(3000, function () {
//   console.log(`App running on port ${ this.address().port }`);
// });


const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('pda_quiz');
    const pda_questions = db.collection('pda_questions');
    const pdaQuizRouter = createRouter(pda_questions)
    app.use('/api/pda_questions', pdaQuizRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
