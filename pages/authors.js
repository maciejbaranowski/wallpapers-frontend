import React, { Component } from "react";
import Link from "next/link";
import DataProvider from "../components/DataProvider";

class AuthorsList extends Component {
  static getInitialProps = async function () {
    const data = await DataProvider.getAuthorsList();
    return {
      authors: data.data
    }
  }

  render() {
    return (
      <div>
        <h2>Cytaty wg autorów</h2>
        <ul className="three-column list-group">
          {this.props.authors.map((author, i) => {
            return (
              <Link key={i} href={"/?author=" + author.author}>
                <a><li className="list-group-item">{author.author}</li></a>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AuthorsList;
