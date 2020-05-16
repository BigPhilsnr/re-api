'use strict';

var HUnit = require('../models/housingunit');

async function createHUnit(req, res) {
    try {
        const hUnit = await new HUnit(req.body).save();
        return res.status(200).send({
            hUnit: hUnit
        });
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function updateHUnit(req, res) {
    try {
        const id = req.body._id
        delete req.body._id
        const hUnit = await HUnit.findByIdAndUpdate({
            _id,
            id
        }, req.body);

        return res.status(200).send({
            hUnit: hUnit
        });

    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function getHUnit(req, res) {
    try {
        if (req.query.id) {
            const hUnit = await HUnit.findById(req.query.id);
            return res.status(200).send({
                hUnit: hUnit
            })
        }

        const page = req.query.page;
        const limit = req.query.limit;
        let query = req.query;
        delete query.page;
        delete query.limit;

        const hUnits = await HUnit.paginate(query, {
            limit: limit,
            page: page
        });

        return res.status(200).send({
            hUnits: hUnits
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error
        });
    }

}

async function deleteHUnit(req, res) {
    try {
        const result = await HUnit.findById(req.query.id).remove()
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
    createHUnit,
    getHUnit,
    deleteHUnit,
    updateHUnit
};