'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { Users } = require('./models/user');
const router = express.Router();

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const app = express();

app.use(morgan('common'));
app.use(express.json());

// get all users
router.get('/users', (req, res) => {
 console.log(req.headers);
    User
        .find()
        .then(users => {
            res.json({
            users: users.map(user => user.serialize())
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
      .then(user => res.json(user.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something is wrong' });
    });
});
// // Ask En.Ali aboit the required fields
// // post 
// router.post('/users', (req, res) => {
//     const requiredFields = ['fullName','username','email', 'rewardsGranted','tasks'];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!(field in req.body)) {
//             const message = `Missing \`${field}\` in request body`;
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     }
// });

// // update users (how to make shorter?)
// app.put("/edit/:id", (req, res) => {
//     if (!(req.params.id)) {
//       const message =
//         `Request path id (${req.params.id}) and request body id ` +
//         `(${req.body.id}) must match`;
//       return res.status(400).json({ message: message });
//     }
  
//     console.log('req.body', req.body)
//     const toUpdate = {};
//     const updateableFields = ['fullName','username','email', 'rewardsGranted','tasks'];
  
//     if (req.body.item) {
//       updateableFields.forEach(field => {
//         if (field in req.body) {
//           toUpdate[field] = req.body[field];
//         }
//       })
//     } 
//     if (req.body.checked !== null && req.body.checked !== undefined) {
//       toUpdate.checked = req.body.checked
//     } 
//     if (req.body.starred !== null && req.body.starred !== undefined) {
//       toUpdate.starred = req.body.starred
//     }

//     Users
//         .findOne({_id: req.params.id})
//         .then(Users => {
//             .findByIdAndUpdate (req.params.id, {$set: toUpdate }
//             .then(upddateUser => {
//                 res.status(201).json(Users.serialize())})        
//             .catch(err => {
//                 console.error(err);
//                 res.status(500).json({ error: 'Something went wrong' });
//              })
//         )}
//     )
// });

// //Delete a user
// router.delete('/delete/:id', (req, res) => {
//     console.log(req.params.id);
//     User
//         .findByIdAndRemove(req.params.id)
//         .then(() => {
//             console.log(`Deleted user with id \`${req.params.id}\``);
//             res.status(204).end().json({ message: 'deleted' });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ error: 'something is wrong' });
//     });
// });

module.exports = router;