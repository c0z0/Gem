import React, { Component } from 'react'
import Radium from 'radium'

@Radium class Search extends Component {
	render() {
		return (
			<div style={styles.inputContainer}>
				<div onClick={this.props.onBack} style={[styles.inputButton]}>
					<i className="material-icons">close</i>
				</div> {''}
				<input
					autoFocus
					ref={this.props.inputRef}
					type="text"
					style={styles.input}
					placeholder="Title..."
					onChange={this.props.onTitleChange}
					value={this.props.title}
				/>
				<input
					autoFocus
					ref={this.props.inputRef}
					type="text"
					style={[styles.input, { borderLeft: '4px solid #75489B' }]}
					placeholder="Tagged..."
					onChange={this.props.onTagChange}
					value={this.props.tagValue}
				/>

			</div>
		)
	}
}

export default Search

const styles = {
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		margin: '24px',
		'@media (max-width: 520px)': {
			margin: '16px 0'
		}
	},
	inputButton: {
		color: '#75489B',
		alignItems: 'center',
		display: 'flex',
		cursor: 'pointer',
		transition: 'all .2s',
		padding: '0 24px'
	},
	input: {
		outline: 0,
		color: '#0000',
		padding: '8px',
		flex: 7,
		fontSize: '130%',
		width: '80%',
		borderWidth: '0'
	}
}
