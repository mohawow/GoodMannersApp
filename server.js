'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const router = express.Router();

mongoose.Promise = global.Promise;

const app = express();
const jsonParser = bodyParser.json();

app.use(morgan('common'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const rewardRouter = require('./routes/rewards')
const { DATABASE_URL, PORT } = require('./config');

app.use(express.static('public'));
app.use('/users', userRouter);
app.use('/tasks', taskRouter)
app.use('/rewards', rewardRouter)
app.use('/completed', rewardGrantedRouter)


app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };