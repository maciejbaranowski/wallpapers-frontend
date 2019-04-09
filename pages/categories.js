import React, { Component } from "react";
import Link from "next/link";
import DataProvider from "../components/DataProvider";
import PopularCategories from "../components/PopularCategories";

class Categories extends Component {
  static getInitialProps = async function () {
    const data = await DataProvider.getCategoriesList();
    return {
      categories: data.data
    }
  }

  render() {
    return (
      <div>
        <PopularCategories />
        <h2>Pozostałe Kategorie</h2>
        <ul className="three-column list-group">
          {this.props.categories.map((category, i) => {
            return (
              <Link key={category.id} href={"/?category=" + category.id}>
                <a><li className="list-group-item">{category.name}</li></a>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Categories;
