// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicons, stylesheets, or any other static assets can be included here */}
          {/* Note: The viewport meta tag should be used in _app.tsx or individual pages, not in _document.tsx */}
          <meta charSet="UTF-8" />
          {/* Other head elements here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

