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

  getRatingValue = () => {
    if (this.props.numberOfVotes == 0) return 0;
    return this.props.sumVotes / this.props.numberOfVotes;
  };

  generateFiveStars() {
    let ratingString = [];
    let treshold = this.getRatingValue() - 0.5;
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

  generateRatingHtml = () => {
    if (this.state.alreadyVoted === true) {
      return "Dziękujemy za oddanie głosu";
    }
    return [
      this.generateFiveStars(),
      "| Ocena : ",
      this.getRatingValue().toFixed(2),
      "(głosów: ",
      this.props.numberOfVotes,
      ")"
    ];
  };

  render() {
    return <div className="rating-container">{this.generateRatingHtml()}</div>;
  }
}
