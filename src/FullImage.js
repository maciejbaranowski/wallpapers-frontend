import React, { Component } from "react";
import DataProvider from "./DataProvider";

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
        wallpaper: response.data.list.map(wallpaper => {
          wallpaper.filename = DataProvider.getImagesHost() + wallpaper.filename;
          return wallpaper;
        })[0]
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>{this.state.wallpaper.quote}</h3>
        <img
          src={this.state.wallpaper.filename}
          alt={this.state.wallpaper.quote}
          className="img-responsive img-thumbnail"
        />
        <h6>Kategoria: {this.state.wallpaper.category}</h6>
      </div>
    );
  }
}
