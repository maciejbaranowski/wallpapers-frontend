import axios from "axios";

class DataProvider {
  static getApiUrl = () => "https://api.tapetycytaty.pl/api/";
  static getImagesHost = () => "https://api.tapetycytaty.pl/";

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

  static async getWikiDescription(text) {
    try {
      const wikiInfo = await axios.get("https://pl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + text, {
        crossDomain: true
      });
      const pageId = Object.keys(wikiInfo.data.query.pages)[0];
      const description = wikiInfo.data.query.pages[pageId].extract;
      return description;
    }
    catch {
      return "";
    }
  }
}

export default DataProvider;
