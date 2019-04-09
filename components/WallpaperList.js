import React, { Component } from "react";
import Link from "next/link";
import Wallpaper from "./Wallpaper";
import { LoadingPane } from "./LoadingPane";
import { isEmptyString, setPageTitle } from "./utils";

class WallpaperList extends Component {
  static defaultProps = {
    searchPhrase: "",
    page: 0,
    wallpapersNumber: 0,
    wallpapersPerPage: 10,
    author: "",
    category: "",
    wallpapersList: []
  }
  getNumberOfPages() {
    return this.props.wallpapersNumber / this.props.wallpapersPerPage;
  }

  getBasicUrl() {
    if (!isEmptyString(this.props.searchPhrase)) {
      return "/?searchPhrase=" + this.props.searchPhrase;
    }
    if (!isEmptyString(this.props.author)) {
      return "/?author=" + this.props.author;
    }
    return "/?category=" + this.props.category;
  }

  getNextPageButton() {
    if (this.props.page < this.getNumberOfPages() - 1) {
      return (
        <Link href={this.getBasicUrl() + "&page=" + (Number(this.props.page) + 1)}>
          <a className="btn btn-default moved-to-right">Następna strona</a>
        </Link>
      );
    }
    return null;
  }

  getPreviousPageButton() {
    if (this.props.page >= 1) {
      return (
        <Link href={this.getBasicUrl() + (Number(this.props.page) - 1)}>
          <a className="btn btn-default">Poprzednia strona</a>
        </Link>
      );
    }
    return null;
  }

  conditionallyShowNothingFound() {
    if (this.props.wallpapersList.length === 0 && this.props.dataFetched === true) {
      return <p>Nie znaleziono tapet spełniających podane kryteria</p>;
    }
    return null;
  }

  componentDidMount() {
    setPageTitle(this.generateTitle());
  }
  
  componentWillUnmount() {
    setPageTitle();
  }

  generateTitle = () => {
    if (!isEmptyString(this.props.category) && this.props.category != "all")
      return "Tapety na pulpit z kategorii: " + this.props.category;
    if (!isEmptyString(this.props.searchPhrase)) return "Wyniki wyszukiwania: " + this.props.searchPhrase;
    if (!isEmptyString(this.props.author)) return "Cytaty autora: " + this.props.author;
    return "Strona główna";
  };

  render() {
    return (
      <div>
        <h2>{this.generateTitle()}</h2>
        {!this.props.dataFetched ? <LoadingPane /> : ""}
        <div className="row three-column">
          {this.props.wallpapersList.map((wallpaper, i) => {
            return <Wallpaper key={i} data={wallpaper} index={i} />;
          })}
          {this.conditionallyShowNothingFound()}
        </div>
        <div className="row">
          {this.getPreviousPageButton()}
          {this.getNextPageButton()}
        </div>
      </div>
    );
  }
}

export default WallpaperList;
