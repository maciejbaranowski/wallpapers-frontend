import React, { Component } from "react";
import Link from "next/link";
import Rating from "./Rating";
import DataProvider from "./DataProvider";

export default class Wallpaper extends Component {
  render() {
    return (
      <div className="no-column-break panel panel-default">
        <div className="panel-body">
          <Link href={"/image?id=" + this.props.data.id}>
            <a>
            <h4>{this.props.data.quote}</h4>
            <img src={this.props.data.filename} alt={this.props.data.quote} className="img-responsive img-thumbnail" />
            </a>
          </Link>
          <h6>Kategoria: {this.props.data.categoryName}</h6>
          <Rating
            sumVotes={this.props.data.sumVotes}
            numberOfVotes={this.props.data.noVotes}
            placeVote={i => {
              DataProvider.postVote(this.props.data.id, i);
            }}
          />
        </div>
      </div>
    );
  }
}
