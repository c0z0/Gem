import React, { Component } from 'react'
import Radium, { StyleRoot } from 'radium'
import autobind from 'autobind-decorator'
import Router from 'next/router'
import axios from 'axios'
import cookie from 'js-cookie'

import Header from '../components/Header.js'

const stages = {
	email: {
		text: 'To sign up or login enter your email below:',
		placeholder: 'Email...',
		type: 'email'
	},
	old: {
		text: 'To continue, enter your password bellow: ',
		placeholder: 'Password...',
		type: 'password'
	},
	new: {
		text: 'It looks that you are new here! To continue, enter a password bellow: ',
		placeholder: 'Password...',
		type: 'password'
	}
}

@Radium class Index extends Component {
	state = {
		email: '',
		stage: 'email',
		password: '',
		err: false,
		loading: false
	}

	@autobind async check(e) {
		e.preventDefault()
		if (this.state.stage === 'email') {
			if (!this.state.email.length) return
			try {
				this.setState({ loading: true })
				const { data } = await axios.post('/api/email', {
					email: this.state.email
				})
				if (data.err) return this.setState({ err: data.err, loading: false })
				this.setState({
					stage: data.new ? 'new' : 'old',
					err: '',
					loading: false
				})
				this._input.focus()
			} catch (err) {
				this.setState({ err: err.message, loading: false })
			}
		} else {
			if (!this.state.password.length) return
			try {
				this.setState({ loading: true })
				const {
					data
				} = await axios.post(
					`/api/${this.state.stage === 'old' ? 'login' : 'register'}`,
					{
						email: this.state.email,
						password: this.state.password
					}
				)
				if (data.err) return this.setState({ err: data.err, loading: false })
				cookie.set('session', data._id)
				Router.replace('/gems')
			} catch (err) {
				this.setState({ err: err.message, loading: false })
			}
		}
	}

	static getInitialProps({ query, req }) {
		return {
			err: query.err,
			userAgent: req ? req.headers['user-agent'] : navigator.userAgent
		}
	}

	render() {
		return (
			<StyleRoot radiumConfig={{ userAgent: this.props.userAgent }}>
				<Header />
				{this.state.err || this.props.err
					? <div style={styles.message}>

							{this.state.err || this.props.err}
						</div>
					: null}
				<div style={styles.container}>
					<div style={styles.card}>
						<h1 style={styles.heading}>Gem</h1>
						<h3 style={styles.heading}>{stages[this.state.stage].text}</h3>
						<form style={styles.inputContainer} onSubmit={this.check}>
							{this.state.stage !== 'email'
								? <div
										style={[styles.inputButton, { flex: 0.5 }]}
										onClick={() => {
											this.setState({ stage: 'email', password: '' })
											this._input.focus()
										}}
									>
										<i class="material-icons">arrow_back</i>
									</div>
								: null}
							<input
								autoFocus
								ref={i => {
									this._input = i
								}}
								type={stages[this.state.stage].type}
								style={styles.input}
								placeholder={stages[this.state.stage].placeholder}
								onChange={e => {
									const newState = {}
									newState[stages[this.state.stage].type] = e.target.value
									this.setState(newState)
								}}
								value={this.state[stages[this.state.stage].type]}
							/>
							<input type="submit" style={{ display: 'none' }} />
							<div
								style={[
									styles.inputButton,
									{
										color: this.state[
											this.state.stage === 'email' ? 'email' : 'password'
										].length
											? '#75489B'
											: '#aaa',
										cursor: this.state[
											this.state.stage === 'email' ? 'email' : 'password'
										].length
											? 'pointer'
											: 'default'
									}
								]}
								onClick={this.check}
							>
								{this.state.loading
									? <div class="spinner">
											<div class="bounce1" />
											<div class="bounce2" />
											<div class="bounce3" />
										</div>
									: <i class="material-icons">check</i>}
							</div>
						</form>
					</div>
				</div>
			</StyleRoot>
		)
	}
}

const styles = {
	message: {
		padding: '16px',
		position: 'absolute',
		bottom: 0,
		left: '50%',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: '#75489B',
		borderBottomColor: '#fff',
		transform: 'translateX(-50%)'
	},
	container: {
		backgroundColor: '#fff',
		height: '100vh',
		flexDirection: 'column'
	},
	heading: {
		color: '#75489B',
		fontWeight: '500'
	},
	card: {
		width: '40%',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center'
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderBottom: '1px #75489B solid',
		width: '100%'
	},
	input: {
		border: 0,
		outline: 0,
		color: '#0000',
		padding: '8px',
		flex: 5,
		fontSize: '130%'
	},
	inputButton: {
		color: '#75489B',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		cursor: 'pointer',
		transition: 'all .2s'
	}
}

export default Index