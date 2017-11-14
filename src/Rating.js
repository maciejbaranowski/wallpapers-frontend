import React, { Component } from "react";

export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      userChoice: null,
      alreadyVoted: false
    };
  }
  generateStar = (i, character) => (
    <span
      key={i}
      className="star"
      onMouseEnter={() => {
        this.mouseEnter(i);
      }}
      onMouseLeave={this.mouseLeave}
      onClick={() => {
        if (!this.state.alreadyVoted) {
          this.props.placeVote(i + 1);
          this.setState({ alreadyVoted: true });
        }
      }}
    >
      {character}
    </span>
  );
  generateFiveStars() {
    let ratingString = [];
    let treshold = this.props.value - 0.5;
    if (this.state.userChoice !== null && !this.state.alreadyVoted) {
      treshold = this.state.userChoice;
    }
    let i = 0;
    for (; i <= treshold; i++) {
      ratingString.push(this.generateStar(i, "★"));
    }
    for (; i <= 4; i++) {
      ratingString.push(this.generateStar(i, "☆"));
    }
    return ratingString;
  }

  mouseEnter = i => {
    this.setState({
      userChoice: i
    });
  };

  mouseLeave = () => {
    this.setState({ userChoice: null });
  };
  render() {
    return (
      <div className="rating-container">
        {this.generateFiveStars()} | Ocena : {this.props.value.toFixed(2)} (głosów: {this.props.numberOfVotes})
      </div>
    );
  }
}
