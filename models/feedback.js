'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FeedBackSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

FeedBackSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('FeedBack', FeedBackSchema);
