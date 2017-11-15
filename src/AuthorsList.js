import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataProvider from "./DataProvider";

class AuthorsList extends Component {
  constructor() {
    super();
    this.state = {
      authors: []
    };
  }
  componentDidMount() {
    DataProvider.getAuthorsList().then(response => {
      this.setState({ authors: response.data });
    });
  }

  render() {
    return (
      <div>
        <h2>Cytaty wg autorów</h2>
        <ul className="three-column list-group">
          {this.state.authors.map((author, i) => {
            return (
              <Link key={i} to={"author/" + author.author}>
                <li className="list-group-item">{author.author}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AuthorsList;
