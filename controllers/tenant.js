'use strict';

var Tenant = require('../models/tenant');
var User = require('../models/user')


async function createTenant(req, res) {
    try {
        if (req.body.user) {
            const user = await new User(req.body.user).save();
            req.body.user = user._id
        }
        let tenant = await new Tenant(req.body).save();
        tenant = await Tenant.findById(tenant._id).populate('user');
        return res.status(200).send({
            tenant: tenant
        });
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    }

}

async function updateTenant(req, res) {
    try {
        const id = req.body._id
        delete req.body._id
        let tenant = await Tenant.findByIdAndUpdate({
            _id: id
        }, req.body);
        tenant = await Tenant.findById(tenant._id).populate('user');
        console.log(tenant)
        return res.status(200).send({
            tenant: tenant
        });

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            error: error
        });
    }
}

async function getTenant(req, res) {
    try {
        console.log(req.user)
        if (req.query._id) {
            const tenant = await Tenant.findById(req.query._id).populate('user');
            return res.status(200).send({
                tenant: tenant
            })
        }

        const page = req.query.page;
        const limit = req.query.limit;
        let query = req.query;
        delete query.page;
        delete query.limit;

        const tenants = await Tenant.paginate(query, {
            limit: limit,
            page: page,
            populate: 'user'
        });
        return res.status(200).send({
            tenants: tenants
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error
        });
    }

}


async function deleteTenant(req, res) {
    try {
        const result = await Tenant.findById(req.query._id).remove()
        return res.status(200).send({
            tenant: {
                _id: req.query._id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error
        });
    }

}


module.exports = {
    createTenant,
    getTenant,
    deleteTenant,
    updateTenant,
};