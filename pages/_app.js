import React from "react";
import Navigation from "../components/Navigation";
import {CopyrightFooter} from "../components/Static";
import Router from "next/router"
import {LoadingPane} from "../components/LoadingPane";
import App, {Container} from "next/app"
import {withRouter} from "next/router"


class CustomApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

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
      })
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="container unselectable">
        <Navigation/>
        <div className="well">
          {this.state.loading
            ? <LoadingPane/>
          : <Container><Component {...pageProps}/></Container>}
        </div>
        <CopyrightFooter/>
      </div>
    )
  };
}

export default withRouter(CustomApp);
