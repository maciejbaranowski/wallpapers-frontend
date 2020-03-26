const gm = require('gm')
const im = gm.subClass({imageMagick: true});

const divideQuote = (quotesArray) => {
  const minLineLength = 45;
  const lastIndex = quotesArray.length - 1; 
  const lastPart = quotesArray[lastIndex];
  const allButLastParts = quotesArray.slice(0, lastIndex);
  if (lastPart.length < 50) return quotesArray;
  const firstChars = lastPart.slice(0,40);
  const words = lastPart.slice(40).split(" ");
  const charsToSpace = words[0];
  const reminderchars = words.slice(1).join(" ");
  if (!reminderchars) return quotesArray;
  const newPart = firstChars.concat(charsToSpace);
  return divideQuote([...allButLastParts, newPart, reminderchars])
};
const getRandomFont = () => {
  const fonts = [
    ".\\static\\fonts\\Amarante-Regular.ttf",
    ".\\static\\fonts\\BerkshireSwash-Regular.ttf",
    ".\\static\\fonts\\Devonshire-Regular.ttf",
    ".\\static\\fonts\\KaushanScript-Regular.ttf",
    ".\\static\\fonts\\Lobster-Regular.ttf",
    ".\\static\\fonts\\Righteous-Regular.ttf"
  ];
  const randomIndex = Math.floor(Math.random() * fonts.length) 
  return fonts[randomIndex];
}
const generateWallpaper = async (quote, backgroundImage, author) => {
  const offset = 5;
  const writeQuote = (image, quote, author) => {
    image = image
      .font(getRandomFont(), 60)
      .fill('black');
    const lines = divideQuote([quote]);
    lines.forEach((line, index) => {
      const lineY = 1000 - (lines.length-index)*100;
      image = image
        .drawText(30+offset, lineY+offset, line)    
        .drawText(30-offset, lineY+offset, line)    
        .drawText(30+offset, lineY-offset, line)    
        .drawText(30-offset, lineY-offset, line);
    });
    image = image
      .drawText(1000+offset, 1020+offset, author)
      .drawText(1000-offset, 1020+offset, author)    
      .drawText(1000+offset, 1020-offset, author)    
      .drawText(1000-offset, 1020-offset, author)
      .blur(20,5)
      .fill('white');
    lines.forEach((line, index) => {
      const lineY = 1000 - (lines.length-index)*100;
      image = image.drawText(30,lineY, line);
    });
    image = image.drawText(1000,1020, author);
    return image;
  };
  return new Promise((resolve, reject)=> {
    writeQuote(im(1920, 1080, "#00000000"), quote, author)
    .write(".\\static\\quote.png", () => {
      im(`https://api.tapetycytaty.pl/img/${backgroundImage}`)
      .resize(1920,1080)
      .compose("Over")
      .composite(".\\static\\quote.png")
      .resize(1920, 1080)
      .write(".\\static\\output.jpeg", () => {
        im(`.\\static\\output.jpeg`)
          .resize(1920 / 4)
          .write(".\\static\\thumbnail.jpeg", () => {
            resolve(`/static/output.jpeg`)
          });
      });
    });
  });      
}

module.exports = generateWallpaper;