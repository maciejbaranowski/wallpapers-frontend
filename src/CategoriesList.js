import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataProvider from "./DataProvider";

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    DataProvider.getCategoriesList().then(response => {
      this.setState({ categories: response.data });
    });
  }
  render() {
    return (
      <div>
        <h2>Kategorie</h2>
        <ul className="three-column list-group">
          {this.state.categories.map((category, i) => {
            return (
              <Link key={category.id} to={"list/" + category.id}>
                <li className="list-group-item">{category.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CategoriesList;
