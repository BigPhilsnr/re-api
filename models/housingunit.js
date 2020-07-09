// @ts-nocheck
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HUnitSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }],
    property: {
        type: Schema.ObjectId,
        ref: 'Property',
        required: true
    },
    images: [{
        type: Schema.ObjectId,
        ref: 'File'
    }]
}, {
    timestamps: true
});
HUnitSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('HUnit', HUnitSchema);