'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { Users } = require('../models/user');
const router = express.Router();

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('../config');
const app = express();

app.use(morgan('common'));
app.use(express.json());

// get all users
router.get('/users', (req, res) => {
 console.log(req.headers);
    Users
        .find()
        .then(users => {
            res.json({
            Users: users.map(user => user.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something is wrong'});
    });
});

// get users by id
router.get('/users/:id', (req, res) => {
    Users
      .findById(req.params.id)
      .then(ser => res.json(user.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something is wrong' });
    });
});
module.exports = router;