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
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: `
              window.smartlook||(function(d) {
              var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
              var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
              c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', '8bd03bd71deed10dc7ed5241baf0c965969358c1', { region: 'eu' });
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}
