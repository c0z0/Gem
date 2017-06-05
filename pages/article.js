import React, { Component } from 'react'
import axios from 'axios'
import Radium, { StyleRoot } from 'radium'
import autobind from 'autobind-decorator'
import Router from 'next/router'
import gql from 'graphql-tag'
import cookie from 'js-cookie'

import appoloClient from '../appoloClient.js'
const client = appoloClient()
import Header from '../components/Header.js'

@Radium class Article extends Component {
	state = { content: ['Loading...'], scroll: 100 }

	async componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	@autobind async disableArticleView() {
		await client.mutate({
			mutation: gql`
				mutation disableArticle($session: String!, $id: String!) {
					disableArticleView(sessionToken: $session, id: $id) {
						title
					}
				}
			`,
			variables: {
				id: this.props._id,
				session: cookie.get('session')
			}
		})
		Router.replace(
			'/gems?err=Sorry about that... Article View is still in beta.',
			'/gems'
		)
	}

	@autobind handleScroll() {
		let h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight'
		const per = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
		this.setState({ scroll: 100 - per })
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	render() {
		let content = this.props.content
		if (!content.length)
			content = (
				<h3 style={{ textAlign: 'center' }}>
					Article view can't read this gem. <a
						href={this.state.url}
						style={{ color: '#fff' }}
					>
						Open original
					</a>
				</h3>
			)
		else content = content.map((e, i) => <p key={i}>{e}</p>)
		return (
			<div>
				<div style={[styles.progress, { right: this.state.scroll + '%' }]} />
				<div style={styles.menuBar}>
					<i
						class="material-icons"
						style={styles.tool}
						onClick={() => {
							window.history.back()
						}}
						key="back"
					>
						arrow_back
					</i>
					<h2 style={styles.heading}>
						{' '}
						<img
							style={{ height: '32px', margin: 'auto' }}
							src="/static/diamond.svg"
						/>
						{' '}
						{' '}
						Gem
					</h2>
					<a href={this.props.outsideUrl} style={styles.open}>
						Open original
						<i
							class="material-icons"
							style={[styles.tool, { fontSize: '90%' }]}
							key="new"
						>
							open_in_new
						</i>
					</a>
				</div>
				<div style={styles.article}>
					<Header title={'Gem | ' + this.props.title} />
					<h1 style={{ textAlign: 'center' }}>{this.props.heading}</h1>
					{content}
					{content.length
						? <p
								style={{
									textAlign: 'center',
									marginTop: '48px',
									color: '#999',
									fontSize: '80%'
								}}
							>
								Article not loading properly?
								{' '}
								<span
									onClick={this.disableArticleView}
									style={{
										color: '#999',
										cursor: 'pointer',
										textDecoration: 'underline'
									}}
								>
									Disable article view for this gem.
								</span>
							</p>
						: null}
				</div>
			</div>
		)
	}
}

const styles = {
	progress: {
		position: 'fixed',
		top: '0',
		left: '0',
		height: '2px',
		backgroundColor: '#ffaa64'
	},
	article: {
		backgroundColor: '#292929',
		minHeight: '100vh',
		color: '#fff',
		textAlign: 'justify',
		padding: '48px',
		fontFamily: 'Roboto Slab',
		'@media (max-width: 520px)': {
			padding: '16px'
		}
	},
	heading: {
		color: '#75489B',
		fontWeight: '500',
		display: 'inline-block',
		padding: '12px'
	},
	tool: {
		color: '#75489B',
		cursor: 'pointer',
		':hover': {
			color: '#9568bb'
		},
		margin: '8px'
	},
	open: {
		position: 'absolute',
		top: '50%',
		right: '16px',
		transform: 'translateY(-50%)',
		color: '#75489B'
	},
	menuBar: {
		position: 'relative'
	}
}

export default class Wrapper extends Component {
	static async getInitialProps({ query, req }) {
		const client = appoloClient(req)

		const { data: { gem } } = await client.query({
			query: gql`
				query getGem($id: String!) {
					gem(id: $id) {
						content
						title
						heading
						outsideUrl: url
						_id
					}
				}
			`,
			variables: { id: query.id }
		})

		return {
			...gem,
			userAgent: req ? req.headers['user-agent'] : navigator.userAgent
		}
	}

	render() {
		return (
			<StyleRoot radiumConfig={{ userAgent: this.props.userAgent }}>
				<Article {...this.props} />
			</StyleRoot>
		)
	}
}
