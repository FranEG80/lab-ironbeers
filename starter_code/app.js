
const express = require('express');
const hbs     = require('hbs');
const PORT = 3000;

const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname  +'/views/partials') 

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  
  res.render('index', {
    title: "Home",
  });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beer', {
        title: `${beers[0].name} - Random Beer`,
        beers,
      });
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { 
      title: "Beers",
      beers
    });
  })
  .catch(error => {
      console.log(error)
  })
});



app.listen(PORT, () => console.info(`Application listen at port ${PORT}`))

