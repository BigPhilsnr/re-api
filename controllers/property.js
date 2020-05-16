'use strict';

var Property = require('../models/property');

async function createProperty(req, res) {
    try {
        const property = await new Property(req.body).save();
        return res.status(200).send({
            property: property
        });
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function updateProperty(req, res) {
    try {
        const id = req.body._id
        delete req.body._id
        const property = await Property.findByIdAndUpdate({
            _id,
            id
        }, req.body);

        return res.status(200).send({
            property: property
        });

    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }
}

async function getProperty(req, res) {
    try {
        if (req.query.id) {
            const property = await Property.findById(req.query.id);
            return res.status(200).send({
                property: property
            })
        }

        const page = req.query.page;
        const limit = req.query.limit;
        let query = req.query;
        delete query.page;
        delete query.limit;

        const propertys = await Property.paginate(query, {
            limit: limit,
            page: page
        });

        return res.status(200).send({
            propertys: propertys
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error
        });
    }

}

async function deleteProperty(req, res) {
    try {
        const result = await Property.findById(req.query.id).remove()
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
    createProperty,
    getProperty,
    deleteProperty,
    updateProperty
};