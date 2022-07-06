import Document, {
  Head, Html, Main, NextScript,
} from 'next/document';
import Script from 'next/script';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-html-smooth="true">
        <Script
          id="docsearch-core"
          src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
          strategy="beforeInteractive"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
