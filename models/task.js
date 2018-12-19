'use strict';

const mongoose = require("mongoose");
const Reward = require("./reward.js");
mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({ 
    "name": { type: String, default: '' },
	"reward":{type: mongoose.Schema.Types.ObjectId, "ref":"Reward"},
	"complete":{type:Boolean, default:false}
});

taskSchema.set('timestamps', true);

taskSchema.methods.serialize = function () {
    return {
        id: this._id,
        name: this.name,
        reward: this.reward,
        complete: this.complete
    };
};

const Task = mongoose.model('Task', taskSchema);
module.exports = {Task};