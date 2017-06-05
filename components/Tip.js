import React, { Component } from 'react'
import Radium from 'radium'

const Tip = ({ message, action, actionMessage, light }) => (
	<div
		style={[
			styles.container,
			{ backgroundColor: light ? '#75489B' : '#292929' }
		]}
	>
		<span style={styles.message}>{message}</span>
		{actionMessage
			? <span style={styles.actionMessage} onClick={action}>
					{actionMessage}
				</span>
			: null}
	</div>
)

const slideCenter = Radium.keyframes({
	'0%': {
		transform: 'translate(-50%, 120px)',
		opacity: '1'
	},
	'100%': {
		opacity: '1',
		transform: 'translate(-50%, 0px)'
	}
})

const slide = Radium.keyframes({
	'0%': {
		transform: 'translateY(120px)',
		opacity: '1'
	},
	'100%': {
		opacity: '1',
		transform: 'translateY(0px)'
	}
})

const styles = {
	container: {
		zIndex: '100',
		boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3)',
		padding: '16px',
		backgroundColor: '#292929',
		position: 'fixed',
		bottom: '16px',
		borderRadius: '4px',
		left: '50%',
		transform: 'translateX(-50%)',
		animation: 'x .3s',
		animationName: slideCenter,
		'@media (max-width: 520px)': {
			animationName: slide,
			left: 0,
			bottom: 0,
			right: 0,
			borderRadius: 0,
			transform: 'none'
		}
	},
	message: {
		color: '#fff'
	},
	actionMessage: {
		color: '#ffaa64',
		marginLeft: '8px',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		cursor: 'pointer',
		':hover': {
			color: '#ef9a54'
		}
	}
}

export default Radium(Tip)
