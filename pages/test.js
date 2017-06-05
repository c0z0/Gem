import React, { Component } from 'react'
import gql from 'graphql-tag'

import appoloClient from '../appoloClient.js'

class Graphql extends Component {
	static async getInitialProps({ req }) {
		const client = appoloClient(req)
		const { data: { login: { sessionToken } } } = await client.mutate({
			mutation: gql`
				mutation {
					login(email: "cosmoserdean@gmail.com", password: "cosmote12") {
						sessionToken
					}
			}
			`
		})

		const { data: { gems: { gems, hasNextPage } } } = await client.query({
			query: gql`
				query getGems($session: String!){
					gems(sessionToken: $session, first: 1, offset: 1) {
						gems {
							title,
							url
						},
						hasNextPage
					}
				}
			`,
			variables: {
				session: sessionToken
			}
		})

		return {
			result: sessionToken,
			gems,
			hasNextPage
		}
	}

	async onPress() {
		const { data: { login: { sessionToken } } } = await client.mutate({
			mutation: gql`
				mutation {
					login(email: "cosmoserdean@gmail.com", password: "cosmote12") {
						sessionToken
					}
			}
			`
		})

		const { data: { gems } } = await client.query({
			query: gql`
				query {
					gems(sessionToken: "${sessionToken}") {
						title,
						url
					}
				}
			`
		})
	}

	state = {}
	render() {
		const gems = this.props.gems.map((g, i) => {
			return (
				<p key={i}>abcd<a href={g.url} onClick={this.onPress}>{g.title}</a></p>
			)
		})

		return <div>{gems} {this.props.hasNextPage ? 'true' : 'false'}</div>
	}
}

export default Graphql
