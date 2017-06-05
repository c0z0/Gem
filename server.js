const express = require('express')
const mongoose = require('mongoose')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
mongoose.Promise = global.Promise

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const routes = require('./api/index.js')
const graphql = require('./graphql/index.js')
const handle = app.getRequestHandler()

const db_url = process.env.DB_USER
	? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds151451.mlab.com:51451/gem`
	: 'mongodb://localhost:27017/gems'

mongoose.connect(db_url, err => {
	if (err) return console.log(err.stack)
	console.log('Connected to MongoDB.')
})

app
	.prepare()
	.then(() => {
		const server = express()

		// server.use(morgan('combined'))
		server.use('/graphql', graphql)
		server.use('/api/*', bodyParser.json())
		server.use('/', cookieParser())
		server.use('/api', routes)

		server.get('/gems/:tag?', (req, res) => {
			if (!req.cookies.session)
				return app.render(req, res, '/', {
					err: 'You must be logged in to access this page.'
				})
			app.render(req, res, '/gems', req.params)
		})

		server.get('/article/:id', (req, res) => {
			if (!req.cookies.session)
				return app.render(req, res, '/', {
					err: 'You must be logged in to access this page.'
				})
			app.render(req, res, '/article', req.params)
		})

		server.get('/', (req, res) => {
			if (req.cookies.session) return res.redirect('/gems')
			handle(req, res)
		})

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, err => {
			if (err) {
				throw err
			}
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch(err => {
		console.error(err.stack)
		process.exit(1)
	})
