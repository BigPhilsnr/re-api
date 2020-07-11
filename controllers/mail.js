'use strict';

var Mail = require('../models/mail');
var User = require('../models/user');

async function createMail(req, res) {
	try {
		if (req.body.user) {
			const user = await new User(req.body.user).save();
			req.body.user = user._id;
		}
		let mail = await new Mail(req.body).save();
		mail = await Mail.findById(mail._id).populate('user');
		return res.status(200).send({
			mail: mail,
		});
	} catch (error) {
		return res.status(500).send({
			error: error,
		});
	}
}

async function getMail(req, res) {
	try {
		console.log(req.user);
		if (req.query._id) {
			const mail = await Mail.findById(req.query._id).populate('user');
			return res.status(200).send({
				mail: mail,
			});
		}

		const page = req.query.page;
		const limit = req.query.limit;
		let query = req.query;
		delete query.page;
		delete query.limit;

		const mails = await Mail.paginate(query, {
			limit: limit,
			page: page,
			populate: 'user',
		});
		return res.status(200).send({
			mails: mails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: error,
		});
	}
}

module.exports = {
	createMail,
	getMail,
};
