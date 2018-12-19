const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Reward} = require('../models/reward');
const {rewardGranted} = require('../models/rewardType');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const middleware = require("../middleware/index");
mongoose.Promise = global.Promise;

//Show all rewardsGranted
router.get('/rewards/granted',  (req, res) => {
  rewardGranted
      .find()
    .then(rewardGranted => {
        res.json({
          rewardGranted: Reward.map(rewardgranted => rewardgranted.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
    });
});

//Show an individual rewardGranted
router.get('/reward/granted/:id', (req, res) => {
  rewardGranted
    .findById(req.params.id)
    .then(rewardgranted => res.json(rewardgranted.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

//Create a new reward
router.post('/reward/granted', (req, res) => {
    console.log(req.body);
    const requiredFields = ['name'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
  }
  rewardGranted.create({
    name: req.body.name, 
  })
  .then(rewardGranted => res.status(201).json(type.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'something went wrong'});
  });
})

//Update a reward granted
router.put('/reward/granted/:id',  (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {  
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }
    const toUpdate = {};
    const updateableFields = ["name"];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
    rewardGranted
      .findByIdAndUpdate(req.params.id, {$set: toUpdate})
      .then(rewardGranted => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
    }
);


//Delete a Reward Granted 
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    rewardGranted
    .findByIdAndRemove(req.params.id)
    .then(rewardGranted => res.status(204).end())
    .catch(err => res.status(500).json({message: "Internal server error"}));
  });


module.exports = router;