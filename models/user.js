'use strict';

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
require('mongoose-type-email');
mongoose.Promise = global.Promise;


const userSchema = new mongoose.Schema({
    "name": {
	    firstName: { type: String, default: '' },
        lastName: { type: String, default: '' }
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "email": { type: mongoose.SchemaTypes.Email, default: 'name@name.com' },
    "password": {
        type: String,
        required: true
    },
    "rewardsGranted": [{ type: mongoose.Schema.Types.ObjectId, "ref": "Reward" }],
    "tasks": [{ type: mongoose.Schema.Types.ObjectId, "ref": "Task" }],
});


userSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.lastName}`.trim();
});

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
  
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};


userSchema.methods.serialize = function () {
    return {
        id: this._id,
        user: this.fullName,
        username: this.username,
        email: this.email,
        rewardsGranted: this.rewardsGranted,
        tasks: this.tasks
    };
};

const Users = mongoose.model('Users', userSchema);
module.exports = {Users};
