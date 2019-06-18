import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-2855266633887827",
                    enable_page_level_ads: true
              });` }}>
          </script>
          <link href="/static/bootstrap.min.css" rel="stylesheet"/>
          <link href="/static/index.css" rel="stylesheet"/>
          <link href="/static/loader.css" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}

export default MyDocument;
