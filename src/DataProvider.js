import axios from "axios";

class DataProvider {
  static getApiUrl = () => "http://tapetycytaty.pl/api/";
  static getImagesHost = () => "http://tapetycytaty.pl/";

  static getCategoriesList() {
    return axios.get(this.getApiUrl() + "getCategories.php", {
      crossDomain: true,
      params: {}
    });
  }

  static getAuthorsList() {
    return axios.get(this.getApiUrl() + "getAuthors.php", {
      crossDomain: true,
      params: {}
    });
  }

  static getWallpaper(index) {
    return axios.get(this.getApiUrl() + "getImage.php", {
      crossDomain: true,
      params: {
        id: index
      }
    });
  }

  static getWallpapers(category, from, number, searchPhrase, author) {
    return axios.get(this.getApiUrl() + "getImages.php", {
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
      this.getApiUrl() + "postVote.php",
      {
        data: {
          index: index,
          vote: vote
        }
      },
      {
        crossDomain: true
      }
    );
  }

  static sendMessage(email, content) {
    return axios.post(
      this.getApiUrl() + "sendMessage.php",
      {
        data: {
          sender: email,
          content: content
        }
      },
      {
        crossDomain: true
      }
    );
  }
}

export default DataProvider;
