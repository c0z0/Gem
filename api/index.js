const router = require('express').Router()
const bcrypt = require('bcryptjs')
const request = require('request')
const scrapeIt = require('scrape-it')
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

router.post('/gem/url/:session', (req, res) => {
	Session.findById(req.params.session, (err, session) => {
		if (err) return res.status(500).json(err.message)
		if (!session) return res.status(403).json('Invalid session')
		let { url } = req.body
		if (url.substring(0, 4) !== 'http') url = 'http://' + url
		scrapeIt(url, {
			title: 'title',
			heading: 'h1',
			content: {
				listItem: 'p'
			}
		})
			.then(d => {
				let content = d.content.filter(e => {
					return typeof e === 'string'
				})
				res.json({
					url,
					title: d.title,
					content: content,
					heading: d.heading
				})
			})
			.catch(err => {
				return res.json({ err: 'Invalid url.', error: err })
			})
	})
})

router.post('/gem/:session', (req, res) => {
	Session.findById(req.params.session, (err, session) => {
		if (err) return res.status(500).json(err.message)
		if (!session) return res.status(403).json('Invalid session')
		Gem.create(
			{
				email: session.email,
				url: req.body.url,
				title: req.body.title,
				tags: req.body.tags,
				content: req.body.content,
				heading: req.body.heading
			},
			(err, gem) => {
				if (err) return res.status(500).json(err.message)
				res.json(gem)
			}
		)
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

router.delete('/gem/:session/:id', (req, res) => {
	Session.findById(req.params.session, (err, session) => {
		if (err) return res.status(500).json(err.message)
		if (!session) return res.status(403).json('Invalid session')
		Gem.findById(req.params.id, (err, gem) => {
			if (err) return res.status(500).json(err.message)
			if (gem.email !== session.email)
				return res.status(403).json({ err: { message: 'Invalid session' } })
			Gem.findByIdAndRemove(req.params.id, (err, gem) => {
				if (err) return res.status(500).json(err.message)
				res.json(gem)
			})
		})
	})
})

router.get('/article/:id', (req, res) => {
	Gem.findById(req.params.id, (err, gem) => {
		if (err) return res.status(500).json(err.message)
		res.json(gem)
	})
})

router.get('/article/problem/:id', (req, res) => {
	Gem.findByIdAndUpdate(req.params.id, { content: [] }, (err, gem) => {
		if (err) return res.status(500).json(err.message)
		res.json(gem)
	})
})

module.exports = router
