import React, { Component } from 'react'
import Radium from 'radium'
import autobind from 'autobind-decorator'
import Link from 'next/link'
import clipboard from 'clipboard-js'

@Radium class Gem extends Component {
	state = { copied: false }

	@autobind onRemove() {
		this.props.onRemove(this.props._id)
	}

	@autobind async clipboard() {
		await clipboard.copy(this.props.url)
		this.setState({ copied: true })
		setTimeout(() => {
			this.setState({ copied: false })
		}, 15000)
	}

	render() {
		const link = this.props.content.length
			? `/article?id=${this.props._id}`
			: this.props.url
		const as = this.props.content.length
			? `/article/${this.props._id}`
			: this.props.url
		const tags = this.props.tags.map((t, i) => (
			<Link href={`/gems?tag=${t}`} as={`/gems/${t}`} key={i}>
				<a style={styles.tag} title={'See all gems tagged ' + t}>
					{t}
				</a>
			</Link>
		))

		return (
			<div
				style={[
					styles.container,
					{
						borderBottom: this.props.tags.length
							? '1px #75489B solid'
							: '1px #ddd solid'
					}
				]}
			>
				<div style={styles.icons}>
					<i
						title="Copy to clipboard..."
						className="material-icons"
						style={[
							styles.icon,
							{
								color: this.state.copied ? '#2ecc710f0' : '#ddd',
								':hover': {
									color: this.state.copied ? '#2ecc71' : '#222'
								}
							}
						]}
						onClick={this.clipboard}
						key="2"
					>
						{this.state.copied ? 'check' : 'content_copy'}
					</i>
					<i
						title="Delete..."
						className="material-icons"
						style={styles.icon}
						onClick={this.onRemove}
						key="1"
					>
						close
					</i>

				</div>

				<div style={styles.main}>
					<Link href={link} as={as}>
						<a style={styles.link}>{this.props.title}</a>
					</Link>
				</div>
				{this.props.tags.length
					? <div style={styles.tags}>
							{tags}
						</div>
					: null}
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
	icon: {
		color: '#ddd',
		cursor: 'pointer',
		':hover': {
			color: '#222'
		},
		fontSize: '90%',
		margin: '2px'
	},
	icons: {
		color: '#ddd',
		position: 'absolute',
		top: '8px',
		right: '9px',
		':hover': {
			color: '#222'
		}
	},
	tags: {
		color: '#fff',
		backgroundColor: '#75489B',
		padding: '8px 20px'
	},
	tag: {
		padding: '0 8px',
		borderRight: '1px solid rgba(0,0,0,.3)',
		display: 'inline-block',
		cursor: 'pointer',
		color: '#fff',
		textDecoration: 'none'
	}
}

export default Gem
