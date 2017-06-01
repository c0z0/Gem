import React, { Component } from 'react'
import Radium, { StyleRoot } from 'radium'
import autobind from 'autobind-decorator'
import axios from 'axios'
import frontCookie from 'js-cookie'
import cookie from 'cookie'
import Router from 'next/router'
import _ from 'lodash'

import SearchInput from '../components/Search.js'
import TagsInput from '../components/TagsInput.js'
import Input from '../components/Input.js'
import Gem from '../components/Gem.js'
import Header from '../components/Header.js'

@Radium class Gems extends Component {
	constructor(props) {
		super(props)
		this.state = {
			new: '',
			gems: props.gems,
			err: false,
			stage: 0,
			tags: [],
			url: {},
			search: false,
			title: '',
			tag: ''
		}
	}

	@autobind async onUrl(e) {
		e.preventDefault()
		if (!this.state.new.length) return
		this.setState({ loading: true })
		const session = frontCookie.get('session')
		try {
			const { data } = await axios.post(`/api/gem/url/${session}`, {
				url: this.state.new
			})
			if (data.err) return this.setState({ err: data.err, loading: false })
			this.setState({
				stage: 1,
				loading: false,
				err: false,
				url: data
			})
		} catch (err) {
			this.setState({ err: err.message, loading: false })
		}
	}

	@autobind async onAdd(e) {
		e.preventDefault()
		this.setState({ loading: true })
		const tags = this._tagsInput.getTags()
		const session = frontCookie.get('session')
		try {
			const { data } = await axios.post(`/api/gem/${session}`, {
				...this.state.url,
				tags
			})
			if (data.err) return this.setState({ err: data.err, loading: false })
			this.setState({
				stage: 0,
				add: false,
				new: '',
				loading: false,
				err: false,
				gems: [data].concat(this.state.gems)
			})
		} catch (err) {
			this.setState({ err: err.message, loading: false })
		}
	}

	@autobind async onRemove(id) {
		try {
			const session = frontCookie.get('session')
			await axios.delete(`/api/gem/${session}/${id}`)
			const gems = this.state.gems.filter(g => {
				return g._id !== id
			})
			this.setState({ gems })
		} catch (err) {
			this.setState({ err: err.message })
		}
	}

	@autobind logout() {
		frontCookie.remove('session')
		Router.replace('/')
	}

	render() {
		let input = (
			<Input
				icon="arrow_forward"
				onBack={() => {
					this.setState({ new: '', add: false })
				}}
				onChange={e => {
					this.setState({ new: e.target.value })
				}}
				valid={this.state.new.length}
				placeholder="Enter a link to keep..."
				loading={this.state.loading}
				onClick={this.onUrl}
				value={this.state.new}
				inputRef={i => {
					this._input = i
				}}
				tags={['js', 'conf']}
			/>
		)
		if (this.state.stage)
			input = (
				<TagsInput
					ref={t => {
						this._tagsInput = t
					}}
					onBack={() => {
						this.setState({ stage: 0 })
					}}
					loading={this.state.loading}
					onClick={this.onAdd}
				/>
			)

		let gems = (
			<div style={styles.spinnerContainer}>
				<div class="spinner">
					<div class="bounce1" />
					<div class="bounce2" />
					<div class="bounce3" />
				</div>
			</div>
		)
		if (this.state.gems) {
			gems = _.cloneDeep(this.state.gems)
			if (this.props.url.query.tag)
				gems = _.filter(gems, gem => {
					return _.filter(gem.tags, tag => {
						return tag === this.props.url.query.tag
					}).length
				})
			if (this.state.title.length)
				gems = _.filter(gems, gem => {
					return gem.title
						.toLowerCase()
						.includes(this.state.title.toLocaleLowerCase())
				})
			gems = gems.map((gem, i) => (
				<Gem key={i} {...gem} onRemove={this.onRemove} />
			))
		}

		if (!gems.length)
			gems = (
				<div style={{ backgroundColor: '#75489B', padding: '24px' }}>
					<p style={{ color: '#fff', textAlign: 'center' }}>
						{this.state.title.length || this.props.url.query.tag
							? 'No results...'
							: 'Welcome! Start by pressing the plus button up top.'}
					</p>
				</div>
			)

		return (
			<div style={styles.container}>
				{this.state.err || this.props.url.query.err
					? <div style={styles.message}>
							{this.state.err || this.props.url.query.err}
						</div>
					: null}
				<div style={styles.card}>
					<div style={styles.toolbar}>
						<h2 style={styles.heading}>
							{' '}
							<img
								draggable={false}
								style={{ height: '32px', margin: 'auto' }}
								src="/static/diamond.svg"
							/>
							{' '}
							{' '}
							Gem
						</h2>
						<div style={styles.tools}>
							<i
								class="material-icons"
								key="2"
								title="Save gem..."
								style={styles.tool}
								onClick={() => {
									this.setState(
										{
											add: !this.state.add,
											new: '',
											err: this.state.add ? false : this.state.err,
											search: false
										},
										() => {
											this._input.focus()
										}
									)
								}}
							>
								add_box
							</i>
							<i
								class="material-icons"
								key="33"
								style={styles.tool}
								title="Search..."
								onClick={() => {
									this.setState({
										search: !(this.state.search || this.props.url.query.tag),
										title: '',
										add: false
									})
									Router.replace('/gems')
								}}
							>
								search
							</i>
							<i
								class="material-icons"
								key="3"
								style={styles.tool}
								title="Logout..."
								onClick={this.logout}
							>
								exit_to_app
							</i>

						</div>
					</div>
					<div
						style={[
							styles.blackout,
							{
								display: this.state.search || this.state.add ? 'block' : 'none'
							}
						]}
						onClick={() => {
							this.setState({ add: false, search: false })
						}}
					/>
					<form
						onSubmit={this.state.stage ? this.onAdd : this.onUrl}
						style={[styles.add, { display: this.state.add ? 'flex' : 'none' }]}
					>
						{input}
						<input type="submit" style={{ display: 'none' }} />
					</form>
					<form
						onSubmit={e => {
							e.preventDefault()
						}}
						style={[
							styles.add,
							{
								display: this.state.search ? 'flex' : 'none'
							}
						]}
					>
						<SearchInput
							onTitleChange={e => {
								this.setState({ title: e.target.value })
							}}
							tagValue={this.props.url.query.tag}
							title={this.state.title}
							onTagChange={e => {
								const { value } = e.target
								if (value.length)
									return Router.replace(`/gems?tag=${value}`, `/gems/${value}`)
								Router.replace('/gems')
							}}
							onBack={() => {
								this.setState({ title: '', search: false })
								if (this.props.url.query.tag) Router.replace('/gems')
							}}
						/>
						<input type="submit" style={{ display: 'none' }} />
					</form>
					<div style={styles.cardContainer}>
						{gems}
					</div>
				</div>
				<Header purple />
			</div>
		)
	}
}

const appear = Radium.keyframes({
	'0%': {
		transform: 'translateY(-20px) scale(.9)',
		opacity: '0'
	},
	'100%': {
		opacity: '1',
		transform: 'translateY(0px) scale(1)'
	}
})

const slide = Radium.keyframes({
	'0%': {
		transform: 'translateY(120px)',
		opacity: '1'
	},
	'100%': {
		opacity: '1',
		transform: 'translateY(0px)'
	}
})

const styles = {
	message: {
		padding: '16px',
		position: 'fixed',
		bottom: 0,
		left: '50%',
		borderWidth: '1px',
		borderStyle: 'solid',
		color: '#fff',
		borderColor: '#fff',
		borderBottomColor: '#75489B',
		transform: 'translateX(-50%)',
		backgroundColor: '#75489B'
	},
	container: {
		padding: '48px',
		'@media only screen and (max-width: 520px)': {
			padding: '0'
		}
	},
	card: {
		backgroundColor: '#fff',
		boxShadow: '2px 2px 3px 2px rgba(0,0,0,0.2)',
		borderBottom: '#ffaa64 solid 8px'
	},
	heading: {
		color: '#75489B',
		fontWeight: '500',
		display: 'inline-block',
		padding: '12px'
	},
	toolbar: {
		padding: '24px',
		borderBottom: '1px #ddd solid'
	},
	cardContainer: {},
	tools: {
		float: 'right',
		display: 'inline-block'
	},
	tool: {
		color: '#75489B',
		cursor: 'pointer',
		':hover': {
			color: '#9568bb'
		},
		margin: '8px'
	},
	add: {
		backgroundColor: '#75489B',
		animation: 'x .3s',
		animationName: appear,
		'@media only screen and (max-width: 520px)': {
			position: 'fixed',
			zIndex: 2,
			bottom: 0,
			left: 0,
			right: 0,
			boxShadow: '0px -5px 35px 0px rgba(0,0,0,0.30)',
			borderTop: '#ffaa64 solid 8px',
			animationName: slide
		}
	},
	spinnerContainer: {
		textAlign: 'center',
		padding: '24px'
	},
	blackout: {
		'@media only screen and (max-width: 520px)': {
			position: 'fixed',
			zIndex: 1,
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,.7)',
			animation: 'x .3s',
			animationName: Radium.keyframes({
				'0%': {
					opacity: 0
				},
				'100%': {
					opacity: 1
				}
			})
		}
	}
}

export default class Wrapper extends Component {
	static async getInitialProps({ query, req }) {
		const baseUrl = req ? `${req.protocol}://${req.headers.host}` : ''

		const session = req
			? cookie.parse(req.headers.cookie).session
			: frontCookie.get('session')

		const { data } = await axios.get(baseUrl + `/api/gem/${session}`)
		return {
			gems: data,
			userAgent: req ? req.headers['user-agent'] : navigator.userAgent
		}
	}

	render() {
		return (
			<StyleRoot radiumConfig={{ userAgent: this.props.userAgent }}>
				<Gems {...this.props} />
			</StyleRoot>
		)
	}
}
