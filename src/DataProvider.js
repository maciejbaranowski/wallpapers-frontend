import axios from "axios";

class DataProvider {
  static getApiUrl = () => "https://tapety-backend.herokuapp.com/api/";
  static getImagesHost = () => "http://tapetycytaty.pl/";

  static getCategoriesList() {
    return axios.get(this.getApiUrl() + "getCategories", {
      crossDomain: true,
      params: {}
    });
  }

  static getAuthorsList() {
    //TODO: replace with proper request once implemented
    return axios.get(this.getApiUrl() + "getCategories", {
      crossDomain: true,
      params: {}
    });
  }

  static getWallpaper(index) {
    return axios.get(this.getApiUrl() + "getImages", {
      crossDomain: true,
      params: {
        firstIdx: index - 1,
        numberOfImgs: 1,
        searchPhrase: ""
      }
    });
  }

  static getWallpapers(category, from, number, searchPhrase) {
    return axios.get(this.getApiUrl() + "getImages", {
      crossDomain: true,
      params: {
        firstIdx: from,
        numberOfImgs: number,
        searchPhrase: searchPhrase,
        category: category
      }
    });
  }

  static postVote(index, vote) {
    console.log("Voted: ", vote, ", on wallpaper: ", index);
    return axios.post(this.getApiUrl() + "postVote", {
      crossDomain: true,
      params: {
        index,
        vote
      }
    });
  }

  static sendMessage(email, content) {
    console.log(
      "Would send an e-mail from: ",
      email,
      " with: ",
      content,
      " if it was actually implemented"
    );
  }
}

export default DataProvider;
