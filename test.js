const scrapeIt = require('scrape-it')

// Promise interface
scrapeIt(
	'https://hackernoon.com/how-to-graft-react-on-to-legacy-code-3ad86e55e2f1',
	{
		title: 'h1',
		content: 'p',
		title: 'title'
	}
).then(page => {
	console.log(page)
})
