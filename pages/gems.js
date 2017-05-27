import React, { Component } from 'react'
import Radium from 'radium'

import Gem from '../components/Gem.js'
import Header from '../components/Header.js'

@Radium class Gems extends Component {
	state = {}
	render() {
		return (
			<div style={styles.container}>
				<div style={styles.card}>
					<div style={styles.toolbar}>
						<h2 style={styles.heading}>Gem</h2>
						<div style={styles.tools}>
							<i
								class="material-icons"
								key="2"
								style={styles.tool}
								onClick={() => {
									this.setState({ add: !this.state.add })
								}}
							>
								add_box
							</i>
							<i class="material-icons" key="3" style={styles.tool}>settings</i>
						</div>
					</div>
					<div
						style={[styles.add, { display: this.state.add ? 'flex' : 'none' }]}
					>
						<input
							type="text"
							style={styles.input}
							placeholder="Enter a link to keep..."
						/>
					</div>
					<div style={styles.cardContainer}>
						<Gem />
						<Gem />
						<Gem />
					</div>
				</div>
				<Header purple />
			</div>
		)
	}
}

const styles = {
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
		padding: '8',
		flex: 5,
		fontSize: '130%',
		width: '80%',
		margin: '24px'
	}
}

export default Gems
