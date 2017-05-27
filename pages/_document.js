import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { StyleRoot } from 'radium'

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		return { html, head, errorHtml, chunks, styles }
	}

	render() {
		return (
			<html>
				<Head>
					<style>{`body { margin: 0 } /* custom! */`}</style>
					<title>Gem</title>
				</Head>
				<body className="custom_class">
					{this.props.customValue}
					<StyleRoot>
						<Main />
					</StyleRoot>
					<NextScript />
				</body>
			</html>
		)
	}
}
