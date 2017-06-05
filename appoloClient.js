import ApolloClient, { createNetworkInterface } from 'apollo-client'
import 'isomorphic-fetch'

export default req => {
	return new ApolloClient({
		networkInterface: createNetworkInterface({
			uri: req
				? `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${req.headers.host}/graphql`
				: '/graphql'
		})
	})
}
