import React, { Component } from 'react'
import Radium from 'radium'

@Radium class Gem extends Component {
	state = {}
	render() {
		return (
			<div style={styles.container}>
				<i className="material-icons" style={styles.close}>close</i>
				<div style={styles.main}>
					<a href="http://www.youtube.com" style={styles.link}>Youtube</a>
					{/*<div style={styles.tags}>
						<div className="ui label" style={{ fontFamily: " 'Raleway' " }}>
							23
						</div>
					</div>*/}
				</div>

			</div>
		)
	}
}

const styles = {
	container: {
		borderBottom: '1px #ddd solid',
		position: 'relative'
	},
	main: {
		padding: '24px'
	},
	tags: {
		marginTop: '16px',
		textAlign: 'right'
	},
	tag: {
		color: '#fff',
		backgroundColor: '#75489B'
	},
	link: {
		color: '#75489B'
	},
	close: {
		color: '#ddd',
		position: 'absolute',
		top: '8px',
		right: '9px',
		fontSize: '90%',
		cursor: 'pointer',
		':hover': {
			color: '#222'
		}
	}
}

export default Gem
