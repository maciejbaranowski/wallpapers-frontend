import React, { Component } from "react";
import Link from "next/link";

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      searchPhrase: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <Link href="/"><a>Strona główna</a></Link>
            </li>
            <li>
              <Link href="/categories"><a>Kategorie</a></Link>
            </li>
            <li>
              <Link href="/authors"><a>Autorzy</a></Link>
            </li>
            <li>
              <Link href="/licence"><a>Licencja</a></Link>
            </li>
            <li>
              <Link href="/contact"><a>Kontakt</a></Link>
            </li>
          </ul>
          <div className="navbar-form navbar-left">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="searchPhrase"
                placeholder="Szukaj..."
                onChange={this.handleInput}
              />
            </div>
            <Link href={"/?searchPhrase=" + this.state.searchPhrase}>
              <a className="btn btn-default">Szukaj</a>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
