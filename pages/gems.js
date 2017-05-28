import React, { Component } from 'react'
import Radium from 'radium'
import autobind from 'autobind-decorator'
import axios from 'axios'
import cookie from 'js-cookie'
import Router from 'next/router'

import Gem from '../components/Gem.js'
import Header from '../components/Header.js'

@Radium class Gems extends Component {
	state = { new: '', gems: false, err: false }

	@autobind async onAdd(e) {
		e.preventDefault()
		if (!this.state.new.length) return
		this.setState({ loading: true })
		const session = cookie.get('session')
		try {
			const { data } = await axios.post(`/api/gem/${session}`, {
				url: this.state.new
			})
			if (data.err) return this.setState({ err: data.err, loading: false })
			this.setState({
				gems: this.state.gems.concat([data]),
				add: false,
				new: '',
				loading: false,
				err: false
			})
		} catch (err) {
			this.setState({ err: err.message, loading: false })
		}
	}

	@autobind logout() {
		cookie.remove('session')
		Router.replace('/')
	}

	async componentDidMount() {
		const session = cookie.get('session')
		try {
			const { data } = await axios.get(`/api/gem/${session}`)
			this.setState({ gems: data })
		} catch (err) {
			this.setState({ err: err.message })
		}
	}

	render() {
		let gems = (
			<div style={styles.spinnerContainer}>
				<div class="spinner">
					<div class="bounce1" />
					<div class="bounce2" />
					<div class="bounce3" />
				</div>
			</div>
		)
		if (this.state.gems)
			gems = this.state.gems.map((gem, i) => <Gem key={i} {...gem} />)
		return (
			<div style={styles.container}>
				{this.state.err
					? <div style={styles.message}>
							{this.state.err}
						</div>
					: null}
				<div style={styles.card}>
					<div style={styles.toolbar}>
						<h2 style={styles.heading}>Gem</h2>
						<div style={styles.tools}>
							<i
								class="material-icons"
								key="2"
								title="Add gem"
								style={styles.tool}
								onClick={() => {
									this.setState(
										{
											add: !this.state.add,
											new: '',
											err: this.state.add ? false : this.state.err
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
								key="3"
								style={styles.tool}
								title="Logout"
								onClick={this.logout}
							>
								exit_to_app
							</i>
						</div>
					</div>
					<form
						onSubmit={this.onAdd}
						style={[styles.add, { display: this.state.add ? 'flex' : 'none' }]}
					>
						<div style={styles.inputContainer}>
							<input
								autoFocus
								ref={i => {
									this._input = i
								}}
								type="text"
								style={styles.input}
								placeholder="Enter a link to keep..."
								onChange={e => {
									this.setState({ new: e.target.value })
								}}
								value={this.state.new}
							/>
							<div
								onClick={this.onAdd}
								style={[
									styles.inputButton,
									{
										color: this.state.new.length ? '#75489B' : '#aaa',
										cursor: this.state.new.length ? 'pointer' : 'default'
									}
								]}
							>
								{this.state.loading
									? <div class="spinner">
											<div class="bounce1" />
											<div class="bounce2" />
											<div class="bounce3" />
										</div>
									: <i className="material-icons">add</i>}
							</div>
						</div>
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

const styles = {
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		margin: '24px'
	},
	inputButton: {
		color: '#75489B',
		alignItems: 'center',
		justifyContent: 'flex-end',
		display: 'flex',
		cursor: 'pointer',
		transition: 'all .2s',
		padding: '0 24px'
	},
	message: {
		padding: '16px',
		position: 'absolute',
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
		padding: '48px'
	},
	card: {
		backgroundColor: '#fff',
		boxShadow: '2px 2px 3px 2px rgba(0,0,0,0.2)'
	},
	heading: {
		color: '#75489B',
		fontWeight: '500',
		display: 'inline-block'
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
		display: 'flex'
	},
	input: {
		border: 0,
		outline: 0,
		color: '#0000',
		padding: '8px',
		flex: 7,
		fontSize: '130%',
		width: '80%'
	},
	spinnerContainer: {
		textAlign: 'center',
		padding: '24px'
	}
}

export default Gems
