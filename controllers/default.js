'use strict';

var moment = require('moment');
const version = '0.2.0';

function help(req, res) {
    res.sendFile('../../public/index.html')
}

function status(req, res) {
    res.status(200).send({
        message: {
            'api': 'social',
            'status': 'OK',
            'version': version,
            'time': moment().unix()
        }
    });
}

function notFound(req, res) {
    res.status(404).send({
        error: {
            'message': 'Url notfound',
            'status': 'Error',
            'version': version,
            'time': moment().unix()
        }
    });
}

module.exports = {
    help,
    status,
    notFound
};