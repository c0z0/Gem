import ApolloClient, { createNetworkInterface } from 'apollo-client'
import 'isomorphic-fetch'

export default req =>
	new ApolloClient({
		networkInterface: createNetworkInterface({
			uri: req ? `${req.protocol}://${req.headers.host}/graphql` : '/graphql'
		})
	})
