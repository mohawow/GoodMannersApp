
'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Task } = require('../models/task');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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
router.get('/task/:id', (req, res) => {
  Task
    .findById(req.params.id)
    .then(task => res.json(task.serialize()))
    .catch(err => {
      console.log(req.params.id);
      console.error(err);
      res.status(500).json({error: 'something went wrong! Cannot show an individual task'});
    });
});

router.get('/complete', (req, res) => {
  Task
    .find({"complete":true})
    .then(tasks => {
      res.json({ tasks: tasks.map( task => task.serialize())})
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong cannot show completed tasks'});
    })
});

//Create a task
router.post('/', (req, res) => {
    console.log(`req.body is ${req.body}`);
    const requiredFields = ['taskName', 'rewardType', 'complete', 'created'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
  }
  Task.create({
    taskName: req.body.taskName,
    rewardType: req.body.rewardType,
    complete: req.body.complete,
    created: req.body.created
  })
  .then(Task  => { 
    res.status(201).json(Task.serialize());
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'something went wrong! Cannot create a task'});
  });
})

//Update a task 
router.put('/task/:id', (req, res) => {
    console.log(req.body);
    const toUpdate = {};
    const updateableFields = ['taskName', 'rewardType', 'complete', 'created'];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    })
    Task
      .findByIdAndUpdate(req.params.id, { $set: toUpdate})
      .then(task => res.status(204).end())  
      .catch(err => res.status(500).json({error: 'something went wrong! Cannot update a task'}));
});

//Delete a task 
router.delete('/task/:id',  (req, res) => {
    console.log(req.params.id);
    Task
    .findByIdAndDelete(req.params.id)
    .then(task => res.status(204).end())
    .catch(err => res.status(500).json({error: 'something went wrong! Cannot delete a task'}));
  });

module.exports = router;
