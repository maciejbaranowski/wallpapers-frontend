import React, { Component } from "react";
import DataProvider from "./DataProvider";
import { Link } from "react-router-dom";
import Wallpaper from "./Wallpaper";
import { LoadingPane } from "./LoadingPane";

class WallpaperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallpapersPerPage: 10,
      wallpapersNumber: 0,
      wallpapersList: [],
      dataFetched: false
    };
  }

  fetchData(props) {
    DataProvider.getWallpapers(
      props.category == "all" ? "" : props.category,
      props.page * this.state.wallpapersPerPage,
      this.state.wallpapersPerPage,
      this.props.searchPhrase
    )
      .then(response => {
        this.setState({
          wallpapersList: response.data.list.map(wallpaper => {
            wallpaper.filename =
              DataProvider.getImagesHost() + wallpaper.filename;
            return wallpaper;
          }),
          dataFetched: true,
          wallpapersNumber: response.data.count
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      wallpapersList: [],
      dataFetched: false
    });
    this.fetchData(props);
  }

  getNumberOfPages() {
    return this.state.wallpapersNumber / this.state.wallpapersPerPage;
  }

  getBasicUrl() {
    if (this.props.searchPhrase != "") {
      return "/search/" + this.props.searchPhrase + "/";
    }
    return "/list/" + this.props.category + "/";
  }
  getNextPageButton() {
    if (this.props.page < this.getNumberOfPages()) {
      return (
        <Link
          className="btn btn-default moved-to-right"
          to={this.getBasicUrl() + (Number(this.props.page) + 1)}
        >
          Następna strona
        </Link>
      );
    }
    return null;
  }

  getPreviousPageButton() {
    if (this.props.page > 1) {
      return (
        <Link
          className="btn btn-default"
          to={this.getBasicUrl() + (Number(this.props.page) - 1)}
        >
          Poprzednia strona
        </Link>
      );
    }
    return null;
  }

  conditionallyShowNothingFound() {
    if (
      this.state.wallpapersList.length === 0 &&
      this.state.dataFetched === true
    ) {
      return <p>Nie znaleziono tapet spełniających podane kryteria</p>;
    }
    return null;
  }

  generateTitle = () => {
    if (this.props.category != "" && this.props.category != "all")
      return <h2>Tapety na pulpit z kategorii: {this.props.category}</h2>;
    if (this.props.searchPhrase != "")
      return <h2>Wyniki wyszukiwania: {this.props.searchPhrase}</h2>;
    return <h2>Strona główna</h2>;
  };

  render() {
    return (
      <div>
        {this.generateTitle()}
        {!this.state.dataFetched ? <LoadingPane /> : ""}
        <div className="row three-column">
          {this.state.wallpapersList.map((wallpaper, i) => {
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
