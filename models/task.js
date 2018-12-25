'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const taskSchema = mongoose.Schema({ 
    taskName: { type: String, required: true },
    rewardType:{type: String, required: true},
    complete:{type:Boolean, default:false},
    create_at:{type:Date, default:Date.now()},
    update_at:{type:Date, default:Date.now()},
});

taskSchema.methods.serialize = function () {
    return {
        id: this._id,
        taskName: this.taskName,
        rewardType: this.rewardType,
        complete: this.complete,
        create_at: this.create_at,
        update_at: this.update_at
    };
};

const Task = mongoose.model('Task', taskSchema);
module.exports = {Task};