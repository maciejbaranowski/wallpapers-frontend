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
        <h6>Kategoria: {this.state.wallpaper.categoryName}</h6>
        <Rating
          sumVotes={this.state.wallpaper.sumVotes}
          numberOfVotes={this.state.wallpaper.noVotes}
          placeVote={i => {
            DataProvider.postVote(this.state.wallpaper.id, i);
            window.location.replace("/image/" + (parseInt(this.state.wallpaper.id) + 1));
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
