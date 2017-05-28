import React, { Component } from 'react'
import Radium from 'radium'

@Radium class Input extends Component {
	state = {}
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
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					value={this.props.value}
				/>
				<div
					onClick={this.props.onClick}
					style={[
						styles.inputButton,
						{
							color: this.props.valid ? '#75489B' : '#aaa',
							cursor: this.props.valid ? 'pointer' : 'default'
						}
					]}
				>
					{this.props.loading
						? <div class="spinner">
								<div class="bounce1" />
								<div class="bounce2" />
								<div class="bounce3" />
							</div>
						: <i className="material-icons">{this.props.icon}</i>}
				</div>
			</div>
		)
	}
}

export default Input

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
		border: 0,
		outline: 0,
		color: '#0000',
		padding: '8px',
		flex: 7,
		fontSize: '130%',
		width: '80%'
	}
}
