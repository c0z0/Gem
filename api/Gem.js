const mongoose = require('mongoose')

const GemSchema = new mongoose.Schema({
	url: String,
	title: String,
	email: String,
	tags: Array,
	content: Array,
	time: Number,
	heading: String,
	deleted: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('Gem', GemSchema)
