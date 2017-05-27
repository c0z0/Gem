import React, { Component } from 'react'
import Head from 'next/head'

class Header extends Component {
	state = {}
	render() {
		return (
			<Head>
				<title>Gem</title>
				<style>
					{`body {
							font-family: 'Raleway', sans-serif;
							padding: 0;
							margin: 0;
							background-color: ${this.props.purple ? '#75489B' : '#fff'}
						}`}
				</style>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/components/label.min.css"
				/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Raleway:400,700"
					rel="stylesheet"
				/>
			</Head>
		)
	}
}

export default Header
