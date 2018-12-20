const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const {Reward} = require('../models/reward');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

//Show all completed tasks
router.get('/',  (req, res) => {
  Task
      .find({"complete":"true"})
     .then(tasks => {
        res.json({ tasks: tasks.map( task => task.serialize())
      });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong cannot show completed tasks'});
    });
});

//Show an individual completed task
router.get('/:id', (req, res) => {
  Reward
    .findById(req.params.id)
    .then(reward => res.json(reward.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong! Cannot an individual completed task'});
    });
});



//Delete a completed tasks
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Reward
    .findByIdAndRemove(req.params.id)
    .then(reward => res.status(204).end())
    .catch(err => res.status(500).json({message: 'something went wrong! Cannot delete completed task'}));
  });

module.exports = router;