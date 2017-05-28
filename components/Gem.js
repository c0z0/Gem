import React, { Component } from 'react'
import Radium from 'radium'
import autobind from 'autobind-decorator'

@Radium class Gem extends Component {
	state = {}

	@autobind onRemove() {
		this.props.onRemove(this.props._id)
	}

	render() {
		return (
			<div style={styles.container}>
				<i
					className="material-icons"
					style={styles.close}
					onClick={this.onRemove}
				>
					close
				</i>
				<div style={styles.main}>
					<a href={this.props.url} style={styles.link}>{this.props.title}</a>
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
