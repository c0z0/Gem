import React from 'react'

import Header from '../components/Header.js'

export default class Error extends React.Component {
	static getInitialProps({ res, jsonPageRes }) {
		const statusCode = res
			? res.statusCode
			: jsonPageRes ? jsonPageRes.status : null
		return { statusCode }
	}

	render() {
		return (
			<div style={styles.container}>
				<Header />
				<div style={styles.inner}>
					<h1
						style={{
							color: '#75489B',
							display: 'inline-block',
							fontWeight: '500'
						}}
					>
						404
					</h1>
					<div style={styles.message}>
						Page not found
					</div>
				</div>
			</div>
		)
	}
}

const styles = {
	container: {
		height: '100vh'
	},
	inner: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)'
	},
	message: {
		display: 'inline-block',
		padding: '24px',
		borderLeft: 'solid #ccc 5px',
		margin: '0 24px'
	}
}
