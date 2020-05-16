'use strict';

var Payment = require('../models/payment');

async function createPayment(req, res) {
    try {
        const payment = await new Payment(req.body).save();
        return res.status(200).send({
            payment: payment
        });
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function updatePayment(req, res) {
    try {
        const id = req.body._id
        delete req.body._id
        const payment = await Payment.findByIdAndUpdate({
            _id,
            id
        }, req.body);

        return res.status(200).send({
            payment: payment
        });

    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function getPayment(req, res) {
    try {
        if (req.query.id) {
            const payment = await Payment.findById(req.query.id);
            return res.status(200).send({
                payment: payment
            })
        }

        const page = req.query.page;
        const limit = req.query.limit;
        let query = req.query;
        delete query.page;
        delete query.limit;

        const payments = await Payment.paginate(query, {
            limit: limit,
            page: page
        });

        return res.status(200).send({
            payments: payments
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error
        });
    }

}

async function deletePayment(req, res) {
    try {
        const result = await Payment.findById(req.query.id).remove()
        return res.status(200).send({
            result: result
        })
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

module.exports = {
    createPayment,
    getPayment,
    deletePayment,
    updatePayment
};