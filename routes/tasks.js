
'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Task } = require('../models/task');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const middleware = require("../middleware/index");

mongoose.Promise = global.Promise;

//Show all tasks
router.get('/', (req, res) => {
  Task
    .find()
    .then(tasks => {
        res.json({
          tasks: tasks.map(task => task.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
    });
});

//Show an individual task
router.get('/:id', (req, res) => {
  Task
    .findById(req.params.id)
    .then(task => res.json(task.serialize()))
    .catch(err => {
      console.log(req.params.id);
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

//Create a task
router.post('/tasks', (req, res) => {
    console.log(`req.body is ${req.body}`);
    const requiredFields = ['name', 'reward', 'complete'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
  }
  Task.create({
    name: req.body.name,
    reward: req.body.reward,
    complete: req.body.complete
  })
  .then(Task  => { 
    res.status(201).json(Task.serialize());
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'something went wrong'});
  });
})

//Update a task 
router.put('/id', (req, res) => {
    console.log(req.body);
    const toUpdate = {};
    const updateableFields = ['name', 'reward', 'complete'];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    })
    Task
      .findByIdAndUpdate(req.params.id, { $set: toUpdate})
      .then(match => res.status(204).end()
              )  
      .catch(err => res.status(500).json({error: 'something went wrong'}));
});

//Delete a task 
router.delete('/id',  (req, res) => {
    console.log(req.params.id);
    Task
    .findByIdAndDelete(req.params.id)
    .then(match => res.status(204).end())
    .catch(err => res.status(500).json({error: 'something went wrong'}));
  });

module.exports = router;
