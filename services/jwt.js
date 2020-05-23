'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Secret_Key1-2-3.';

exports.createtoken = function (user) {
    user.iat = moment().unix();
    user.expired =moment().add(3, 'days').unix();
    user.sub = user._id;
   
    return jwt.encode(user, secret);
};
