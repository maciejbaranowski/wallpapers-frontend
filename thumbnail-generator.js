// Temporary utility to generate thumbanils from images

const gm = require('gm')
const im = gm.subClass({imageMagick: true});
const fs = require('fs')

const imagename="abstract370.jpeg";
const directory = "C:\\PROJEKTY\\wallpaper-generator\\img\\";

fs.readdir(directory, (e,files) => {
  if (e) {
    console.log(e);
    return;
  }
  files.filter(file=> file !== "thumbnails").slice(200,300).forEach(file => {
    im(`C:\\PROJEKTY\\wallpaper-generator\\img\\`+file)
    .resize(1920 / 4,1080 / 4)
    .write("C:\\PROJEKTY\\wallpaper-generator\\img\\thumbnails\\"+file, (err) => {
      if (err) {
        console.log(err);
        return
      }
      console.log("Processed file: "+file)
    });
  })
})