'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const taskSchema = mongoose.Schema({ 
    taskName: { type: String, required: true },
    rewardType:{type: String, required: true},
    complete:{type:Boolean, default:false},
});
taskSchema.set('timestamps', true)

taskSchema.methods.serialize = function () {
    return {
        id: this._id,
        taskName: this.taskName,
        rewardType: this.rewardType,
        complete: this.complete,
        created: this.created
    };
};

const Task = mongoose.model('Task', taskSchema);
module.exports = {Task};