const express = require('express')
const next = require('next')
const axios = require('axios')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const loader = require("./loader")
const gm = require('gm')

nextApp.prepare().then(() => {
    const app = express();
    app.use(express.static('static'))
    app.use(express.json());
    app.use('/admin/*', (req,res,next) => {
      axios.post("https://api.tapetycytaty.pl/api/auth.php", 
      null,
      {
        crossDomain: true,
        params: {
          password: req.query.password
        }
      }).then((data) => {``
        if (data.data == "1") {
          next()
        } else {
          res.sendStatus(401);
        }
      }).catch((err) => {
        console.log(err);
      });
    })
    app.get('/admin/quotes*', (req, res) => {
      loader(req.query.author).then((data) => {
        res.send(data);
      }).catch(e => console.log(e));
    })
    app.get('/admin/generate*', (req, res) => {
      const im = gm.subClass({imageMagick: true});
      const offset = 5;
      im(1920, 1080, "#00000000")
      .font(".\\static\\fonts\\Lobster-Regular.ttf", 60)
      .fill('black')
      .drawText(30+offset,1000+offset, req.query.quote)    
      .drawText(30-offset,1000+offset, req.query.quote)    
      .drawText(30+offset,1000-offset, req.query.quote)    
      .drawText(30-offset,1000-offset, req.query.quote)    
      .blur(20,5)
      .fill('white')
      .drawText(30,1000,req.query.quote)
      .write(".\\static\\quote.png", () => {
        im(`https://api.tapetycytaty.pl/img/${req.query.backgroundImage}`)
        .resize(1920,1080)
        .compose("Over")
        .composite(".\\static\\quote.png")
        .resize(1920, 1080)
        .write(".\\static\\output.jpeg", () => {
          im(`.\\static\\output.jpeg`)
            .resize(1920 / 4)
            .write(".\\static\\thumbnail.jpeg", () => {
              res.send(`/static/output.jpeg`)
            });
        });
      })
    })
    app.post('/admin/postWallpaper', (req, res) => {
      const [image, quote, category, author, rating] = req.body.data;

      res.sendStatus(200);
    });
    app.get('/*', (req,res) => {
      return handle(req,res);
    });
    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`Application ready at http://localhost:${PORT}`)
    });
})
