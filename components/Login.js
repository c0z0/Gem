import React, { Component } from 'react'
import Radium from 'radium'

@Radium class Login extends Component {
	state = {}
	render() {
		return (
			<div style={styles.container}>
				<h1 style={styles.heading}>Gem</h1>
				<h3 style={styles.heading}>
					To sign up or login enter your email below:
				</h3>
				<div style={styles.inputContainer}>
					<input type="email" style={styles.input} placeholder="Email..." />
					<div style={styles.inputButton}>
						<i class="material-icons">check</i>
					</div>
				</div>
			</div>
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
		width: '40%',
		'@media max-device-width: 480px': {
			width: '100%'
		}
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

export default Login
