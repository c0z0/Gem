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
		const link = this.props.hasContent
			? `/article?id=${this.props._id}`
			: this.props.url
		const as = this.props.hasContent
			? `/article/${this.props._id}`
			: this.props.url
		const tags = this.props.tags.map((t, i) => (
			<Link href={`/gems?tag=${t}`} as={`/gems/${t}`} key={i}>
				<a style={styles.tag} title={'See all gems tagged ' + t}>
					{t}
				</a>
			</Link>
		))

		let { title } = this.props
		if (title.length > 35) {
			title = title.substring(0, 32) + '...'
		}

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

				<div style={styles.main}>

					<Link href={link} as={as} style={styles.linkComp}>
						<a style={styles.link} title={this.props.title}>{title}</a>
					</Link>
					<div style={styles.icons}>
						<button style={styles.iconButton} key="sss">
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
						</button>
						<button style={styles.iconButton} key="bbb">
							<i
								title="Delete..."
								className="material-icons"
								style={styles.icon}
								onClick={this.onRemove}
								key="1"
							>
								close
							</i>
						</button>

					</div>
				</div>
				{this.props.tags.length
					? <div style={styles.tags}>
							<i className="material-icons" style={{ fontSize: '90%' }}>
								label_outline
							</i>
							{tags}
						</div>
					: null}
			</div>
		)
	}
}

const styles = {
	iconButton: {
		margin: '2px',
		padding: 0,
		border: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		':focus': {
			outline: 0
		}
	},
	container: {
		borderBottom: '1px #ddd solid',
		position: 'relative'
	},
	main: {
		padding: '24px',
		display: 'flex',
		flexDirection: 'row'
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
		color: '#75489B',
		alignItems: 'center',
		justifyContent: 'flex-start',
		display: 'flex'
	},
	icon: {
		color: '#ddd',
		cursor: 'pointer',
		':hover': {
			color: '#222'
		}
		// fontSize: '90%'
	},
	icons: {
		color: '#ddd',
		flex: 1,
		':hover': {
			color: '#222'
		},
		textAlign: 'right'
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
	},
	linkComp: {}
}

export default Gem
