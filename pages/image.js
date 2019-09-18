import React from "react";
import CustomHead from "../components/CustomHead"
import DataProvider from "../components/DataProvider";
import Rating from "../components/Rating";
import Wallpaper from "../components/Wallpaper";
import { randomSelection } from "../components/utils";

export default class Image extends React.Component {
  static getInitialProps = async function (query) {
    const wallpaper = await DataProvider.getWallpaper(query.query.id);
    const description = await DataProvider.getWikiDescription(wallpaper.data.author);
    const similarWallpapers = await DataProvider.getWallpapers(wallpaper.data.category, 0, 10);

    return {
      wallpaper: wallpaper.data,
      description,
      similarWallpapers: randomSelection(similarWallpapers.wallpapers, 6)
    }
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
        <hr />
        <h3>Inne z tej kategorii</h3>
        <div className="row three-column">
          {this.props.similarWallpapers.map((wallpaper, i) => {
            return <Wallpaper key={i} data={wallpaper} index={i} />;
          })}
        </div>
        <h4>O autorze cytatu:</h4>
        <div>{this.props.description}</div>
      </div>
    );
  }
}
