'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PropertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: Schema.ObjectId,
        autopopulate: true,
        ref: 'File'
    }],
    profile: {
        type: Schema.ObjectId,
        ref: 'File'
    },
    features: [{
        type: String
    }],
    location: {
        lat: {
            type: Number
        },
        lon: {
            type: Number
        }
    },
    Property: {
        type: Schema.ObjectId,
        ref: 'Property',
        autopopulate: true

    }
}, {
    timestamps: true
});

PropertySchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Property', PropertySchema);