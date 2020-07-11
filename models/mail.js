'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MailSchema = Schema(
	{
		email: {
			type: String,
			required: true,
			// unique: true,
		},
	},
	{
		timestamps: true,
	}
);

MailSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Mail', MailSchema);
