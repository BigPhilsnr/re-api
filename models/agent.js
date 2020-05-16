'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AgentSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    property: [{
        type: Schema.ObjectId,
        ref: 'Property'
    }],
    fees: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Agent', AgentSchema);