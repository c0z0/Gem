const mongoose = require('mongoose')

const GemSchema = new mongoose.Schema({
	url: String,
	title: String,
	email: String
})

module.exports = mongoose.model('Gem', GemSchema)
