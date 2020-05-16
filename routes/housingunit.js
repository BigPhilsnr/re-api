'use strict';

var express = require('express');
var HUnitcontroller = require('../controllers/housingunit');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/hunit', md_auth.ensureAuth, HUnitcontroller.createHUnit);
api.delete('/hunit/:id', md_auth.ensureAuth, HUnitcontroller.deleteHUnit);
api.put('/hunit', md_auth.ensureAuth, HUnitcontroller.updateHUnit);
api.get('/hunit', md_auth.ensureAuth, HUnitcontroller.getHUnit);

module.exports = api;