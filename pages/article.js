import React, { Component } from 'react'
import axios from 'axios'
import Radium from 'radium'
import autobind from 'autobind-decorator'
import Router from 'next/router'

import Header from '../components/Header.js'

@Radium class Article extends Component {
	state = { content: ['Loading...'], scroll: 100 }

	async componentDidMount() {
		const { data } = await axios.get(`/api/article/${this.props.url.query.id}`)
		window.addEventListener('scroll', this.handleScroll)
		console.log(data)
		this.setState({
			content: data.content,
			heading: data.heading,
			url: data.url,
			title: data.title
		})
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
		let content = this.state.content
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
					<a href={this.state.url} style={styles.open}>
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
					<Header title={'Gem | ' + this.state.title} />
					<h1 style={{ textAlign: 'center' }}>{this.state.heading}</h1>
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
								<a
									onClick={async () => {
										await axios.get(
											`/api/article/problem/${this.props.url.query.id}`
										)
										Router.replace(
											'/gems?err=Sorry about that... Article View is still in beta.',
											'/gems'
										)
									}}
									href="#"
									style={{ color: '#999' }}
								>
									Disable article view for this gem.
								</a>
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
		fontFamily: 'Roboto Slab'
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
		transform: 'translateY(-50%)'
	},
	menuBar: {
		position: 'relative'
	}
}

export default Article
