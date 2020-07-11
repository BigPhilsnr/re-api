'use strict';

var express = require('express');
var Feedbackcontroller = require('../controllers/feedback');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/feedback', md_auth.ensureAuth, Feedbackcontroller.createFeedBack);
api.get('/feedback', md_auth.ensureAuth, Feedbackcontroller.getFeedBack);

module.exports = api;
