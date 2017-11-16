import axios from "axios";

class DataProvider {
  static getApiUrl = () => "https://tapety-backend.herokuapp.com/api/"; //production
  //static getApiUrl = () => "http://127.0.0.1:5000/api/"; //local
  static getImagesHost = () => "http://tapetycytaty.pl/";

  static getCategoriesList() {
    return axios.get(this.getApiUrl() + "getCategories", {
      crossDomain: true,
      params: {}
    });
  }

  static getAuthorsList() {
    return axios.get(this.getApiUrl() + "getAuthors", {
      crossDomain: true,
      params: {}
    });
  }

  static getWallpaper(index) {
    return axios.get(this.getApiUrl() + "getImage", {
      crossDomain: true,
      params: {
        id: index
      }
    });
  }

  static getWallpapers(category, from, number, searchPhrase, author) {
    return axios.get(this.getApiUrl() + "getImages", {
      crossDomain: true,
      params: {
        firstIdx: from,
        numberOfImgs: number,
        searchPhrase: searchPhrase,
        category: category,
        author: author
      }
    });
  }

  static postVote(index, vote) {
    return axios.post(
      this.getApiUrl() + "postVote",
      {
        index: index,
        vote: vote
      },
      {
        crossDomain: true
      }
    );
  }

  static sendMessage(email, content) {
    return axios.post(
      this.getApiUrl() + "sendMessage",
      {
        sender: email,
        content: content
      },
      {
        crossDomain: true
      }
    );
  }
}

export default DataProvider;
