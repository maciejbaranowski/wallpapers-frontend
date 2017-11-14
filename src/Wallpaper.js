import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default class Wallpaper extends Component {
  render() {
    return (
      <div className="no-column-break panel panel-default">
        <div className="panel-body">
          <Link to={"/image/" + this.props.data.id}>
            <h4>{this.props.data.quote}</h4>
            <img src={this.props.data.filename} alt={this.props.data.quote} className="img-responsive img-thumbnail" />
          </Link>
          <h6>Kategoria: {this.props.data.category}</h6>
          <Rating
            value={Math.random() * 5}
            numberOfVotes={400}
            placeVote={i => {
              console.log("Voted: ", i, ", on wallpaper: ", this.props.data.id);
            }}
          />
        </div>
      </div>
    );
  }
}
