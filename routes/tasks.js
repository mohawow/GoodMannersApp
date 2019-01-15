
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
router.get('/:id', (req, res) => {
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
    console.log(req.body.taskname);
    const requiredFields = ['taskname', 'reward', 'complete'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(req.body);
        }
    }
    Task.create({
        taskName: req.body.taskname,
        rewardType: req.body.reward,
        complete: req.body.complete,
        created_at: req.body.created_at,
        update_at: req.body.update_at
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
router.put('/:id', (req, res) => {
    console.log(req.body);
    const toUpdate = {};
    const updateableFields = ['taskName', 'rewardType'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
    Task
      .findByIdAndUpdate(req.params.id, { $set: toUpdate})
      .then(task => res.status(204).end())  
      .catch(err => res.status(500).json({error: 'something went wrong! Cannot update a task'}));
});
//Complete a task
router.put('/complete/:id', (req, res) => {
    console.log(req.body);
    const toUpdate = {};
    const updateableFields = ['complete'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Task
        .findByIdAndUpdate(req.params.id, { $set: toUpdate})
        .then(task => res.status(204).end())
        .catch(err => res.status(500).json({error: 'something went wrong! Cannot update a task'}));
});
//Delete a task 
router.delete('/:id',  (req, res) => {
    console.log(req.params.id);
    Task
    .findByIdAndDelete(req.params.id)
    .then(task => res.status(204).end())
    .catch(err => res.status(500).json({error: 'something went wrong! Cannot delete a task'}));
  });

module.exports = router;
