import React, { Component, Fragment } from "react";
import Link from "next/link";
import CustomHead from "../components/CustomHead"
import Wallpaper from "./Wallpaper";
import { LoadingPane } from "./LoadingPane";
import { isEmptyString } from "./utils";

class WallpaperList extends Component {
  static defaultProps = {
    searchPhrase: "",
    page: 0,
    wallpapersNumber: 0,
    wallpapersPerPage: 10,
    author: "",
    category: "",
    wallpapersList: [],
    adminPassword: null
  }
  getNumberOfPages() {
    return this.props.wallpapersNumber / this.props.wallpapersPerPage;
  }

  getBasicUrl() {
    const createUrl = () => {
      if (!isEmptyString(this.props.searchPhrase)) {
        return "/?searchPhrase=" + this.props.searchPhrase;
      }
      if (!isEmptyString(this.props.author)) {
        return "/?author=" + this.props.author;
      }
      return "/?category=" + this.props.category;
    }
    if (this.props.adminPassword !== null) {
      return "/admin/manage_database" + createUrl() + "&password=" + this.props.adminPassword;
    }
    return createUrl();
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
        <Link href={this.getBasicUrl() + "&page=" + (Number(this.props.page) - 1)}>
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

  conditionallyShowAdminOptions() {
    if (this.props.adminPassword !== null) {
      return <p>Usuń tapetę</p>;
    }
    return null;
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
        <CustomHead 
          title={this.generateTitle()}
          keywords={`${this.props.category},${this.props.author}`}
          description={this.generateTitle()}
        />
        <h2>{this.generateTitle()}</h2>
        {!this.props.dataFetched ? <LoadingPane /> : ""}
        <div className="row three-column">
          {this.props.wallpapersList.map((wallpaper, i) => {
            return <div key={i}>
              <Wallpaper data={wallpaper} index={i} />
              {this.conditionallyShowAdminOptions()}
            </div>
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
