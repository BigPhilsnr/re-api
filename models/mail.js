'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MailSchema = Schema(
	{
		description: String,
		email: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

MailSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Mail', MailSchema);
