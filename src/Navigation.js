import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              <Link to="/">Strona główna</Link>
            </li>
            <li>
              <Link to="/categories">Kategorie</Link>
            </li>
            <li>
              <Link to="/licence">Licencja</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
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
            <Link to={"/search/" + this.state.searchPhrase} className="btn btn-default">
              Szukaj
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
