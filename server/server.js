const express = require('express')
const next = require('next')
const axios = require('axios')
const crypto = require("crypto");
const fs = require('fs');
const loader = require("./loader")
const image_generator = require('./image_generator');
const path = require('path');

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const app = express();
    
    app.use(express.static('static'))
    app.use(express.json());
    // Deploy below once ready
    // app.use('/admin/*', (req,res,next) => {
    //   axios.post("https://api.tapetycytaty.pl/api/auth.php", 
    //   null,
    //   {
    //     crossDomain: true,
    //     params: {
    //       password: req.query.password
    //     }
    //   }).then((data) => {``
    //     if (data.data == "1") {
    //       next()
    //     } else {
    //       res.sendStatus(401);
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // })
    // app.get('/admin/quotes*', (req, res) => {
    //   loader(req.query.author).then((data) => {
    //     res.send(data);
    //   }).catch(e => console.log(e));
    // })
    // app.get('/admin/generate*', async (req, res) => {
    //   const path = await image_generator(req.query.quote, req.query.backgroundImage, req.query.author);
    //   res.send(path);
    // })
    // app.post('/admin/postWallpaper', (req, res) => {
    //   var FormData = require('form-data');
    //   var form = new FormData();
    //   console.log(crypto.randomBytes(16).toString("hex"));
    //   form.append('file', fs.createReadStream(".\\static\\output.jpeg"));
    //   form.append('path', `${req.body.data.path}`);
    //   form.append('quote', `${req.body.data.quote}`);
    //   form.append('category', `${req.body.data.category}`);
    //   form.append('author', `${req.body.data.author}`);
    //   form.append('rating', `${req.body.data.rating}`);
    //   form.append('id', `${crypto.randomBytes(16).toString("hex")}`);
    //   form.submit('https://api.tapetycytaty.pl/api/postWallpaper.php', function(err, res2) {
    //     if (err) console.log(err);
    //     res.send('OK')
    //   });
    // });
    
    app.get('/ads.txt', (req,res) => {
      return res.sendFile('ads.txt', {
        root: path.join(__dirname, '../static')
      });
    });
    
    app.get('/sitemap.txt', (req,res) => {
      return res.sendFile('ads.txt', {
        root: path.join(__dirname, '../static')
      });
    });

    app.get('/*', (req,res) => {
      return handle(req,res);
    });

    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`Application ready at http://localhost:${PORT}`)
    });
})
