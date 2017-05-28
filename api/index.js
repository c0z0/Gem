const router = require('express').Router()
const bcrypt = require('bcryptjs')
const request = require('request')
const cheerio = require('cheerio')

const Session = require('./Session.js')
const User = require('./User.js')
const Gem = require('./Gem.js')

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

router.post('/email', (req, res) => {
	if (!validateEmail(req.body.email))
		return res.json({ err: 'Invalid Email address.' })
	User.find({ email: req.body.email }, (err, users) => {
		if (err) return res.status(500).json(err.message)
		if (users.length) return res.json({ new: false })
		res.json({ new: true })
	})
})

router.post('/register', (req, res) => {
	const password = bcrypt.hashSync(req.body.password, 8)
	User.create({ email: req.body.email, password }, (err, user) => {
		if (err) return res.status(500).json(err.message)
	})
})

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) return res.status(500).json(err.message)
		if (!user) return res.status(403).json('Invalid email or password')
		if (!bcrypt.compareSync(req.body.password, user.password))
			return res.json({ err: 'Invalid email or password' })
		Session.create({ email: req.body.email }, (err, session) => {
			if (err) return res.status(500).json(err.message)
			res.json(session)
		})
	})
})

router.post('/gem/:session', (req, res) => {
	Session.findById(req.params.session, (err, session) => {
		if (err) return res.status(500).json(err.message)
		if (!session) return res.status(403).json('Invalid session')
		let { url } = req.body
		if (url.substring(0, 4) !== 'http') url = 'http://' + url
		request(url, (error, response, html) => {
			if (error) return res.json({ err: 'Invalid url.' })
			const $ = cheerio.load(html)
			const title = $('title').text()
			Gem.create({ email: session.email, url, title }, (err, gem) => {
				if (err) return res.status(500).json(err.message)
				res.json(gem)
			})
		})
	})
})

router.get('/gem/:session', (req, res) => {
	Session.findById(req.params.session, (err, session) => {
		if (err) return res.status(500).json(err.message)
		if (!session) return res.status(403).json('Invalid session')
		Gem.find({ email: session.email }, (err, gems) => {
			if (err) return res.status(500).json(err.message)
			res.json(gems)
		})
	})
})

module.exports = router
