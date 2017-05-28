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
							font-family: 'Raleway', arial;
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
  background-color: #75489B;

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
