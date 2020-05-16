'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    amount: {
        type: Number,
        required: true
    },
    housingunit: {
        type: Schema.ObjectId,
        ref: 'HUnit',
        required: true,
    }
}, {
    timestamps: true
});

PaymentSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Payment', PaymentSchema);