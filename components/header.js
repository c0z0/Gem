import React, { Component } from 'react'
import Head from 'next/head'

class Header extends Component {
	state = {}
	render() {
		return (
			<Head>
				<style>
					{`body {
							font-family: 'Raleway', sans-serif;
							padding: 0;
							margin: 0;
						}`}
				</style>
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
