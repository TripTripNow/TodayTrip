import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <div id="toast"></div>
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
