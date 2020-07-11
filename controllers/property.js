// @ts-nocheck
'use strict';

var Property = require('../models/property');
async function createProperty(req, res) {
    try {
        req.body.user = req.user.userId;
        const property = req.body;
    
        property.location = {
            lat: property.lat,
            lng: property.lng
        };

        if (req.files && req.files.gallery) {
            if (Array.isArray(req.files.gallery)) {
                property.gallery = req.files.gallery.map(image => {
                    return {
                        small: image.path,
                        medium: image.path,
                        big: image.path
                    }
                });
            } else {
                const image = req.files.gallery.path
                property.gallery = [{
                    small: image,
                    medium: image,
                    big: image
                }]
            }

        }

        if (property.videos) {
            if (Array.isArray(property.videos)) {
                property.videos = property.videos.map(link => {
                    return {
                        name: '',
                        link: link
                    }
                })
            } else {
                property.videos = [{
                    name: '',
                    link: property.videos
                }]
            }
        }

        if (property.additionalFeatures) {
            if (Array.isArray(property.additionalFeatures)) {
                property.additionalFeatures = property.additionalFeatures.map(content => {
                    return {
                        name: '',
                        value: content
                    }
                })
            } else {
                property.additionalFeatures = [{
                    name: '',
                    value: property.additionalFeatures
                }]
            }
        }

        if (property.features) {
            if (!Array.isArray(property.features)) {
                property.features = [property.features]
            }
        }

        property.area = {
            value: property.area,
            unit: 'ft'
        }

        property.priceDollar = {};
        property.priceEuro = {};
        property.priceDollar.rent = property.rent
        property.priceEuro.rent = property.rent;
        property.priceDollar.sale = property.sale;
        property.priceEuro.sale = property.sale;
        property.id = 0;

        let propertyResult = await new Property(property).save();
        propertyResult = await Property.findById(propertyResult._id).populate('user');
        return res.status(200).send({
            property: propertyResult
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error.message
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
            const property = await Property.findById(req.query.id).populate('user');
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