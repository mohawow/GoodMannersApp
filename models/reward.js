'use strict';

const mongoose = require("mongoose");
const RewardType  = require('./rewardtype');
mongoose.Promise = global.Promise;

// Just Reward and it's stamp
const rewardSchema = new mongoose.Schema({
	"type":{type: mongoose.Schema.Types.ObectId, "ref":"RewardType"},
});
rewardSchema.set('timestamps', true);

rewardSchema.methods.serialize = function () {
    return {
        id: this._id,
        type: this.type
    };
};

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = {Reward};