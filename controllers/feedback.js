'use strict';

var FeedBack = require('../models/feedback');
var User = require('../models/user');

async function createFeedBack(req, res) {
	try {
		if (req.body.user) {
			const user = await new User(req.body.user).save();
			req.body.user = user._id;
		}
		let feedBack = await new FeedBack(req.body).save();
		feedBack = await FeedBack.findById(feedBack._id).populate('user');
		return res.status(200).send({
			feedBack: feedBack,
		});
	} catch (error) {
		return res.status(500).send({
			error: error,
		});
	}
}

async function getFeedBack(req, res) {
	try {
		console.log(req.user);
		if (req.query._id) {
			const feedBack = await FeedBack.findById(req.query._id).populate('user');
			return res.status(200).send({
				feedBack: feedBack,
			});
		}

		const page = req.query.page;
		const limit = req.query.limit;
		let query = req.query;
		delete query.page;
		delete query.limit;

		const feedBacks = await FeedBack.paginate(query, {
			limit: limit,
			page: page,
			populate: 'user',
		});
		return res.status(200).send({
			feedBacks: feedBacks,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: error,
		});
	}
}

module.exports = {
	createFeedBack,
	getFeedBack,
};
