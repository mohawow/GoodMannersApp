'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Just Reward and it's stamp
const rewardSchema = mongoose.Schema({
    taskName: {type: mongoose.Schema.Types.ObjectId, ref:"Task"},
	rewardType:{type: mongoose.Schema.Types.ObjectId, ref:"Task"},
    complete:{type:Boolean, required: true},
    created: {type: Date, default: Date.now},
});

rewardSchema.methods.serialize = function () {
    return {
        id: this._id,
        taskName: this.taskName,
        rewardType: this.rewardType,
        complete:this.complete,
        created: this.created
    };
};

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = {Reward};