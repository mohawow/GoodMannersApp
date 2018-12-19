'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Just Reward and it's stamp
const rewardSchema = mongoose.Schema({
	rewardType:{type: mongoose.Schema.Types.ObjectId, ref:"RewardType"},
});
rewardSchema.set('timestamps', true);
rewardSchema.methods.serialize = function () {
    return {
        id: this._id,
        rewardType: this.rewardType
    };
};

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = {Reward};