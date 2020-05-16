'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    fullName: {type:String, required:true},
    email:{type:String, required:true},
    phone: {type:String, required:true},
    password: {type:String, required:true},
    avatar: {
        type: Schema.ObjectId,
        ref: 'File',

    }
});

module.exports = mongoose.model('User', UserSchema);