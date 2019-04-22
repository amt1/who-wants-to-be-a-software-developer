const express = require('express');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();
  router.all("*", cors());

  router.get('/', cors(), (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        // console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/level/:difficulty', cors(), (req, res) => {
    // const level = req.params.difficulty;
    // console.log('level: ', level);
    // res.send("level is set to " + req.params.difficulty);
// why is this returning an empty array?
    collection
      .find({ difficulty: req.params.difficulty }).toArray()
      .then((docs) => {
        return res.json(docs)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', cors(), (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', cors(), (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then(() => collection.find().toArray())
      .then((docs) => {
    //  console.log(docs);
      return res.json(docs);

    })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete('/:id', cors(), (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.put('/:id', cors(), (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
      .updateOne(
        { _id: ObjectID(id) },
        { $set: updatedData }
      )
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;

};

module.exports = createRouter;
