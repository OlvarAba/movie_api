const express = require('express');
  morgan = require('morgan');

const app = express();


let topMovies =[
  {
    Title: 'Midsommar',
  },
  {
    Title: 'Everything Everywhere, All at Once',
  },
  {
    Title: 'The Lighthouse',
  },
  {
    Title: 'Men',
  },
  {
    Title: 'The House',
  },
  {
    Title: 'All Dogs go to heaven 2',
  },
  {
    Title: 'Too wong foo, Thanks for everything Julie Newmar',
  },
  {
    Title: 'Pulp Fiction',
  },
  {
    Title: 'Fantastic Mr Fox',
  },
  {
    Title: 'Nlood Diamond',
  },
]

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to My Movies');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});
