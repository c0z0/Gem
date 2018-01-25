import React, { Component } from 'react'
import Radium from 'radium'
import autobind from 'autobind-decorator'

@Radium
class Input extends Component {
	state = { tag: '', tags: [] }

	@autobind
	getTags() {
		if (this.state.tag.length) return this.state.tags.concat([this.state.tag])
		return this.state.tags
	}

	render() {
		const tags = this.state.tags.map((t, i) => (
			<div style={styles.tag} key={i}>
				{t}{' '}
				<i
					className="material-icons"
					style={styles.closeIcon}
					key={i * 6}
					onClick={() => {
						const ts = this.state.tags
						ts.splice(i, 1)
						this.setState({ tags: ts })
					}}
				>
					close
				</i>
			</div>
		))
		return (
			<div style={styles.inputContainer}>
				<div style={styles.inputButton} onClick={this.props.onBack}>
					<i className="material-icons">arrow_back</i>
				</div>
				{tags}
				<input
					autoFocus
					ref={this.props.inputRef}
					type="text"
					style={styles.input}
					placeholder={
						this.state.tags.length === 5
							? "Can't add more tags"
							: this.state.tags.length ? '' : 'Add some tags... (optional)'
					}
					onKeyDown={e => {
						if (e.keyCode === 8 && this.state.tag.length === 0) {
							this.setState({ tags: this.state.tags.slice(0, -1) })
						}
					}}
					onChange={e => {
						if (this.state.tags.length === 5) return
						const { value } = e.target
						if (value[value.length - 1] === ' ' && value.trim().length) {
							return this.setState({
								tags: this.state.tags.concat([value.trim()]),
								tag: ''
							})
						}
						this.setState({ tag: value })
					}}
					value={this.state.tag}
				/>
				<div onClick={this.props.onClick} style={[styles.inputButton]}>
					{this.props.loading ? (
						<div class="spinner">
							<div class="bounce1" />
							<div class="bounce2" />
							<div class="bounce3" />
						</div>
					) : (
						<i className="material-icons">add</i>
					)}
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
		color: '#000',
		padding: '8px',
		flex: 7,
		fontSize: '130%',
		width: '80%'
	},
	tag: {
		padding: '8px',
		alignItems: 'center',
		textAlign: 'center',
		color: '#fff',
		backgroundColor: '#75489B',
		margin: '4px',
		borderRadius: '4px'
	},
	closeIcon: {
		fontSize: '70%',
		color: 'rgba(0,0,0,.5)',
		cursor: 'pointer',
		transition: 'all .2s',
		':hover': {
			color: '#fff'
		}
	}
}
