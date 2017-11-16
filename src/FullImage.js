import React, { Component } from "react";
import DataProvider from "./DataProvider";
import Rating from "./Rating";
export default class FullImage extends Component {
  constructor() {
    super();
    this.state = {
      wallpaper: {}
    };
  }
  componentDidMount() {
    DataProvider.getWallpaper(this.props.match.params.imageId).then(response => {
      this.setState({
        wallpaper: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <a href={DataProvider.getImagesHost() + this.state.wallpaper.filename} className="btn btn-primary" download>
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
        <h3>{this.state.wallpaper.quote}</h3>
        <h6>Kategoria: {this.state.wallpaper.categoryName}</h6>
        <Rating
          sumVotes={this.state.wallpaper.sumVotes}
          numberOfVotes={this.state.wallpaper.noVotes}
          placeVote={i => {
            DataProvider.postVote(this.state.wallpaper.id, i);
          }}
        />
        <img
          src={DataProvider.getImagesHost() + this.state.wallpaper.filename}
          alt={this.state.wallpaper.quote}
          className="img-responsive img-thumbnail"
        />
      </div>
    );
  }
}
