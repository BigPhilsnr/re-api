'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var default_routes = require('./routes/default');
var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var message_routes = require('./routes/message');
var publication_routes = require('./routes/publication');
const sellerRoute = require('./routes/seller')
const shopRoute = require('./routes/shop')
const itemRoute = require('./routes/item')
const orderRoute = require('./routes/order')
const agentRoute = require('./routes/agent')
const expenseRoute = require('./routes/expense')
const paymentRoute = require('./routes/payment')
const housingUnitRoute = require('./routes/housingunit')
const propertyRoute = require('./routes/property');
const invoiceRoute = require('./routes/invoice');
const employeeRoute = require('./routes/employee')
const morgan = require('morgan')
const exec = require('child_process').exec;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers','Authorization')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

app.post("/status", async (req, res) => {
    console.log("updating app from github inde")
    exec('sh social.sh');
    res.status(200).send({
        ok: 1
    });
})

app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', message_routes);
app.use('/api', publication_routes);
app.use('/api', sellerRoute);
app.use('/api', shopRoute);
app.use('/api', itemRoute);
app.use('/api', orderRoute)
app.use('/api', agentRoute);
app.use('/api', expenseRoute);
app.use('/api', paymentRoute);
app.use('/api', housingUnitRoute);
app.use('/api', propertyRoute);
app.use('/api', invoiceRoute);
app.use('/api', employeeRoute);
app.use('/images', express.static(__dirname + '/uploads'));
app.use('/', default_routes);

module.exports = app;