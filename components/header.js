import React, { Component } from 'react'
import Head from 'next/head'

class Header extends Component {
	state = {}
	render() {
		return (
			<Head>
				<title>{this.props.title || 'Gem'}</title>
				<meta name="theme-color" content="#ffaa64" />
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/static/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/static/favicon-16x16.png"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<style>
					{`
						body {
							font-family: Arial;
							font-family: 'Raleway', Arial;
							padding: 0;
							margin: 0;
							background-color: ${this.props.purple ? '#75489B' : '#fff'}
						}
						.spinner {
  width: 50px;
  text-align: center;
}

.spinner > div {
  width: 9px;
  height: 9px;
  background-color: #ffaa64;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
						`}
				</style>
				<link
					href="https://fonts.googleapis.com/css?family=Raleway:400,700|Roboto+Slab|Material+Icons"
					rel="stylesheet"
				/>
			</Head>
		)
	}
}

export default Header
