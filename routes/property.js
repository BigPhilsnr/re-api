'use strict';

var express = require('express');
var Propertycontroller = require('../controllers/property');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/property', md_auth.ensureAuth, Propertycontroller.createProperty);
api.delete('/property/:id', md_auth.ensureAuth, Propertycontroller.deleteProperty);
api.put('/property', md_auth.ensureAuth, Propertycontroller.updateProperty);
api.get('/property', md_auth.ensureAuth, Propertycontroller.getProperty);


module.exports = api;