'use strict';

var express = require('express');
var Mailcontroller = require('../controllers/mail');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/admin', md_auth.ensureAuth, Mailcontroller.createAdmin);
api.get('/admin', md_auth.ensureAuth, Mailcontroller.getAdmin);

module.exports = api;
