const meta = require('node-metainspector')

var page = new meta('http://www.google.com')

page.on('fetch', () => {
	console.log(page.title)
})
