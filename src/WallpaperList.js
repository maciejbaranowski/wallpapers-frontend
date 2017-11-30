import React, { Component } from "react";
import DataProvider from "./DataProvider";
import { Link } from "react-router-dom";
import Wallpaper from "./Wallpaper";
import { LoadingPane } from "./LoadingPane";
import { isEmptyString, setPageTitle } from "./utils";

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
      props.searchPhrase,
      props.author
    )
      .then(response => {
        this.setState({
          wallpapersList: response.data.list.map(wallpaper => {
            wallpaper.filename = DataProvider.getImagesHost() + "thumbnails/" + wallpaper.filename;
            return wallpaper;
          }),
          dataFetched: true,
          wallpapersNumber: response.data.count
        });
        setPageTitle(this.generateTitle());
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData(this.props);
  }
  componentWillUnmount() {
    setPageTitle();
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
    if (!isEmptyString(this.props.searchPhrase)) {
      return "/search/" + this.props.searchPhrase + "/";
    }
    if (!isEmptyString(this.props.author)) {
      return "/author/" + this.props.author + "/";
    }
    return "/list/" + this.props.category + "/";
  }

  getNextPageButton() {
    if (this.props.page < this.getNumberOfPages() - 1) {
      return (
        <Link className="btn btn-default moved-to-right" to={this.getBasicUrl() + (Number(this.props.page) + 1)}>
          Następna strona
        </Link>
      );
    }
    return null;
  }

  getPreviousPageButton() {
    if (this.props.page >= 1) {
      return (
        <Link className="btn btn-default" to={this.getBasicUrl() + (Number(this.props.page) - 1)}>
          Poprzednia strona
        </Link>
      );
    }
    return null;
  }

  conditionallyShowNothingFound() {
    if (this.state.wallpapersList.length === 0 && this.state.dataFetched === true) {
      return <p>Nie znaleziono tapet spełniających podane kryteria</p>;
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
        <h2>{this.generateTitle()}</h2>
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
