const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const {Reward} = require('./models/reward');
const {rewardGranted} = require('./models/rewardGranted');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const middleware = require("./middleware/index");
mongoose.Promise = global.Promise;

//Show all rewards
router.get('/rewards',  (req, res) => {
  Reward
      .find()
    .then(Reward => {
        res.json({
          Reward: Reward.map(reward => reward.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
    });
});

//Show an individual reward
router.get('/reward/:id', (req, res) => {
  Reward
    .findById(req.params.id)
    .then(reward => res.json(reward.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

//Create a new reward
router.post('/reward', (req, res) => {
    console.log(req.body);
    const requiredFields = ['type'];
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
  }
  Reward.create({
    type: req.body.type, 
  })
  .then(reward => res.status(201).json(type.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'something went wrong'});
  });
})

//Update a reward
router.put('/reward/:id',  (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {  
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }
    const toUpdate = {};
    const updateableFields = ["type"];

    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
      Reward
      .findByIdAndUpdate(req.params.id, {$set: toUpdate})
      .then(reward => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
    }
);


//Delete a reward 
router.delete('/reward/:id', jwtAuth, (req, res) => {
    console.log(req.params.id);
    Reward
    .findByIdAndRemove(req.params.id)
    .then(reward => res.status(204).end())
    .catch(err => res.status(500).json({message: "Internal server error"}));
  });


module.exports = router;