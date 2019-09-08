import React from "react";
import CustomHead from "../components/CustomHead"
import DataProvider from "../components/DataProvider";
import Rating from "../components/Rating";
import { setPageTitle } from "../components/utils";

export default class Image extends React.Component {
  static getInitialProps = async function (query) {
    const wallpaper = await DataProvider.getWallpaper(query.query.id);
    const description = await DataProvider.getWikiDescription(wallpaper.data.author);
    return {
      wallpaper: wallpaper.data,
      description: description
    }
  }

  componentDidMount() {
    setPageTitle(this.props.wallpaper.quote);
  }
  componentWillUnmount() {
    setPageTitle();
  }

  render() {
    return (
      <div>
        <CustomHead 
          title={this.props.wallpaper.quote}
          keywords={`${this.props.wallpaper.author},${this.props.wallpaper.categoryName}`}
          description={`Cytat ${this.props.wallpaper.author}, kategoria ${this.props.wallpaper.categoryName} - ${this.props.wallpaper.quote}`}
        />
        <a href={DataProvider.getImagesHost() + this.props.wallpaper.filename} className="btn btn-primary" download>
          Pobierz tapetę (jakość HD 1920x1080)
        </a>
        <div
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={() => {
            window.history.back();
          }}
        >
          Powrót
        </div>
        <h3>{this.props.wallpaper.quote}</h3>
        <h6>Kategoria: {this.props.wallpaper.categoryName}</h6>
        <Rating
          sumVotes={this.props.wallpaper.sumVotes}
          numberOfVotes={this.props.wallpaper.noVotes}
          placeVote={i => {
            DataProvider.postVote(this.props.wallpaper.id, i);
          }}
        />
        <img
          src={DataProvider.getImagesHost() + this.props.wallpaper.filename}
          alt={this.props.wallpaper.quote}
          className="img-responsive img-thumbnail"
        />
        <h4>O autorze cytatu:</h4>
        <div>{this.props.description}</div>
      </div>
    );
  }
}
