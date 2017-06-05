const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const scrapeIt = require('scrape-it')
const _ = require('lodash')

const User = require('../api/User.js')
const Gem = require('../api/Gem.js')

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

const resolvers = {}

resolvers.gems = async ({ sessionToken, first, offset }) => {
	const { email } = jwt.verify(sessionToken, process.env.DB_PASS || 'secret')
	let gems = await Gem.find({ email, deleted: false })
	gems = _.sortBy(gems, [
		function(o) {
			return -o.time
		}
	])
	gems = gems.map(g => {
		g.hasContent = g.content.length > 0
		return g
	})
	if (offset && first)
		return {
			gems: gems.slice(offset, offset + first),
			hasNextPage: first + offset < gems.length
		}
	if (first)
		return { gems: gems.slice(0, first), hasNextPage: first < gems.length }
	return { gems, hasNextPage: false }
}

resolvers.login = async ({ email, password }) => {
	const user = await User.findOne({ email })
	if (!user)
		return {
			error: {
				message: 'Invalid email or password.'
			}
		}
	if (!bcrypt.compareSync(password, user.password))
		return {
			error: {
				message: 'Invalid email or password.'
			}
		}
	return {
		sessionToken: jwt.sign({ email }, process.env.DB_PASS || 'secret')
	}
}

resolvers.checkEmail = async ({ email }) => {
	if (!validateEmail(email))
		return {
			error: {
				message: 'Invalid email address.'
			}
		}
	const user = await User.findOne({ email })
	if (user)
		return {
			exists: true
		}
	return {
		exists: false
	}
}

resolvers.register = async ({ email, password }) => {
	await User.create({ email, password: bcrypt.hashSync(password) })
	return {
		sessionToken: jwt.sign({ email }, process.env.DB_PASS || 'secret')
	}
}

resolvers.checkUrl = async ({ url }) => {
	if (url.substring(0, 4) !== 'http') url = 'http://' + url
	try {
		const urlInfo = await scrapeIt(url, {
			title: 'title',
			heading: 'h1',
			content: {
				listItem: 'p'
			}
		})
		urlInfo.content = urlInfo.content.filter(e => {
			return typeof e === 'string'
		})
		return {
			url: {
				url,
				content: urlInfo.content,
				heading: urlInfo.heading,
				title: urlInfo.title,
				hasContent: urlInfo.content.length > 0
			}
		}
	} catch (err) {
		return {
			error: {
				message: 'Invalid url.'
			}
		}
	}
}

resolvers.saveGem = async ({ url, sessionToken, tags }) => {
	const { email } = jwt.verify(sessionToken, process.env.DB_PASS || 'secret')
	const gem = await Gem.create({
		url: url.url,
		content: url.content,
		heading: url.heading,
		title: url.title,
		email,
		tags,
		time: new Date().getTime()
	})
	gem.hasContent = gem.content.length > 0
	return {
		gem
	}
}

resolvers.deleteGem = async ({ sessionToken, id }) => {
	const { email } = jwt.verify(sessionToken, process.env.DB_PASS || 'secret')
	const gem = await Gem.findByIdAndUpdate(id, { deleted: true })
	return gem
}

resolvers.gem = async ({ id }) => {
	const gem = await Gem.findById(id)
	gem.hasContent = gem.content.length > 0
	return gem
}

resolvers.disableArticleView = async ({ sessionToken, id }) => {
	const { email } = jwt.verify(sessionToken, process.env.DB_PASS || 'secret')
	const gem = await Gem.findById(id)
	if (gem.email !== email)
		return {
			error: "You aren't allowed to do this."
		}
	await Gem.findByIdAndUpdate(id, { content: [] })
	return gem
}

resolvers.undoDeleteGem = async ({ sessionToken, id }) => {
	const { email } = jwt.verify(sessionToken, process.env.DB_PASS || 'secret')
	const gem = await Gem.findByIdAndUpdate(id, { deleted: false })
	return gem
}

module.exports = resolvers
