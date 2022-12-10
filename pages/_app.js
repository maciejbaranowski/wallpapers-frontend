import React from "react";
import Navigation from "../components/Navigation";
import {CopyrightFooter} from "../components/Static";
import Router from "next/router"
import {LoadingPane} from "../components/LoadingPane";
import App from "next/app"
import {withRouter} from "next/router"

import ReactGA from "react-ga";
ReactGA.initialize("UA-109847829-2");

class CustomApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

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

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    Router
      .events
      .on('routeChangeStart', url => {
        this.setState({loading: true})
      })
    Router
      .events
      .on('routeChangeComplete', () => {
        this.setState({loading: false})
      })
    Router
      .events
      .on('routeChangeError', () => {
        this.setState({loading: false})
      });
    this.fixCanonical();
    this.reportAnalytics();
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="container unselectable">
        <Navigation/>
        <div className="well">
          {this.state.loading
            ? <LoadingPane/>
          : <Component {...pageProps}/>}
        </div>
        <CopyrightFooter/>
      </div>
    )
  };
}

export default withRouter(CustomApp);
