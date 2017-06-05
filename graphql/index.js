var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

var schema = buildSchema(require('./root.gql'))

var root = require('./Resolvers.js')

module.exports = graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: process.env.NODE_ENV !== 'production'
})
