import React, { Component } from 'react'
import Radium, { StyleRoot } from 'radium'
import autobind from 'autobind-decorator'
import Router from 'next/router'

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
	state = { email: '', stage: 'email', password: '' }

	@autobind async check() {
		if (this.state.stage === 'email')
			this.setState({ stage: ['new', 'old'][Math.floor(Math.random() * 2)] })
		else Router.replace('/gems')
	}

	render() {
		return (
			<StyleRoot>
				<Header />
				<div style={styles.container}>
					<h1 style={styles.heading}>Gem</h1>
					<h3 style={styles.heading}>{stages[this.state.stage].text}</h3>
					<div style={styles.inputContainer}>
						<input
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
						<div style={styles.inputButton} onClick={this.check}>
							<i class="material-icons">check</i>
						</div>
					</div>
				</div>
			</StyleRoot>
		)
	}
}

const styles = {
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		height: '100vh',
		flexDirection: 'column'
	},
	heading: {
		color: '#75489B',
		fontWeight: '500'
	},
	card: {
		width: '50%',
		textAlign: 'center'
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderBottom: '1px #75489B solid',
		width: '40%'
	},
	input: {
		border: 0,
		outline: 0,
		color: '#0000',
		padding: '8',
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
