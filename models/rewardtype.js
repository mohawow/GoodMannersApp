'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Reward Type and it's stamp
const rewardTypeSchema = new mongoose.Schema({
	"name": {type:String, required: true},
});
rewardTypeSchema.set('timestamps', true),

rewardTypeSchema.methods.serialize = function () {
    return {
        id: this._id,
        name: this.name
    };
};

const rewardType = mongoose.model('rewardType', rewardTypeSchema);

module.exports = {rewardType};