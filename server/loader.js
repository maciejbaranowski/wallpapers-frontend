const axios = require("axios");
const jsdom = require("jsdom");

const loadQuotes = async (author) => {
  const data = await axios.get(`https://pl.wikiquote.org/w/api.php?action=parse&page=${author}&format=json`);
  const doc = new jsdom.JSDOM(data.data.parse.text['*']);
  const quoteElements = doc.window.document.querySelectorAll('.mw-parser-output > ul > li');
  return Array
    .from(quoteElements)
    .map(e => e.innerHTML.split('\n')[0]) //filter out any additional quote details (source, translation etc.)
    .filter(quote => !quote.includes('<') && quote.length < 250) //filter out quotes with markup and too long
}
module.exports = loadQuotes;
