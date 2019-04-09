import Document, { Html, Head, Main, NextScript } from 'next/document';

import ReactGA from "react-ga";
ReactGA.initialize("UA-109847829-2");

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
/*
  reportAnalytics = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    return null;
  };
  
  fixCanonical = () => {
    let oldLinks = document.getElementsByTagName("link");
    Array
      .from(oldLinks)
      .forEach(e => {
        if (e.rel === "canonical") {
          e
            .parentNode
            .removeChild(e);
        }
      });
    let linkTag = document.createElement("link");
    linkTag.rel = "canonical";
    linkTag.href = window.location;
    document
      .getElementsByTagName("head")[0]
      .appendChild(linkTag);
    return null;
  };
*/
  render() {
    return (
      <Html>
        <Head>
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
