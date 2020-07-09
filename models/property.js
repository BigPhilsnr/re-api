// @ts-nocheck
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    propertyType: {
        type: String,
        required: true
    },
    propertyStatus: {
        type: [String]
    },
    city: {
        type: String
    },
    zipCode: {
        type: Date
    },
    neighborhood: {
        type: [
            String
        ]
    },
    street: {
        type: [
            String
        ]
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    formattedAddress: {
        type: String
    },
    features: {
        type: [
            String
        ]
    },
    featured: {
        type: Boolean
    },
    priceDollar: {
        sale: {
            type: Number
        },
        rent: {
            type: Number
        }
    },
    priceEuro: {
        sale: {
            type: Number
        },
        rent: {
            type: Number
        }
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    garages: {
        type: Number
    },
    area: {
        value: {
            type: Number
        },
        unit: {
            type: String
        }
    },
    yearBuilt: {
        type: Number
    },
    ratingsCount: {
        type: Number
    },
    ratingsValue: {
        type: Number
    },
    additionalFeatures: {
        type: [{
            name: String,
            value: String
        }]
    },
    gallery: {
        type: [{
            small: String,
            medium: String,
            big: String,
        }]
    },
    plans: {
        type: [{
            name: String,
            desc: String,
            area: {
                value: String,
                unit: String,

            },
            room: Number,
            baths: Number,
            image: String,

        }]
    },
    videos: {
        type: [{
            name: String,
            link: String,
        }]
    },
    published: {
        type: Date
    },
    lastUpdate: {
        type: Date
    },
    views: {
        type: Number
    }
}, {
    timestamps: true
});

PropertySchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Property', PropertySchema);