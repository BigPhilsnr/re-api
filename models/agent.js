'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AgentSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    property: [{
        type: Schema.ObjectId,
        ref: 'Property'
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    cut: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Agent', AgentSchema);