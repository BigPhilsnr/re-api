'use strict';

var express = require('express');
var Mailcontroller = require('../controllers/mail');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/mail', md_auth.ensureAuth, Mailcontroller.createMail);
api.get('/mail', md_auth.ensureAuth, Mailcontroller.getMail);

module.exports = api;
