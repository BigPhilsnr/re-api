'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TenantSchema = Schema({
    description: String,
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "ACTIVE",
    },
    hUnit: {
        type: Schema.ObjectId,
        ref: 'HUnit',
        required: true
    }
}, {
    timestamps: true
});

TenantSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Tenant', TenantSchema);