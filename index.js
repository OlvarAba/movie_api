const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  app = express();

 let users = [
 ]

 let movies = [
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
    Title: 'Blood Diamond',
  },

 ];

  app.use(bodyParser.json());

  app.use(express.static('public'));

  app.use(morgan('common'));

 // CREATE
 app.post('/users', (req, res) => {
   const newUser = req.body;

   if (newUser.name) {
     newUser.id = uuid.v4();
     users.push(newUser);
     res.status(201).json(newUser)
   } else {
     res.status(400).send('users need names.')
   }
 })

 // READ
 app.get('/movies', (req, res) => {
   res.status(200).json(movies);
 })

 // READ
 app.get('/movies/:title', (req, res) => {
   const { title } = req.params;
   const movie = movies.find( movie => movie.Title === title);

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('movie not found.')
    }
 })

 // READ
 app.get('/movies/genre/:genreName', (req, res) => {
   const { genreName } = req.params;
   const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('genre not found.')
    }
 })

 // READ
 app.get('/movies/directors/:directorName', (req, res) => {
   const { directorName } = req.params;
   const director = movies.find( movie => movie.Director.Name === directorName).Director;

    if (director) {
      res.status(200).json(director);
    } else {
      res.status(400).send('director not found.')
    }
 })

 // UPDATE
 app.put('/users/:id', (req, res) => {
   const { id } = req.params;
   const updatedUser = req.body;

   let user = users.find( user => user.id == id );

   if (user) {
     user.name = updatedUser.name;
     res.status(200).json(user);
   } else {
     res.status(400).send('no user found.')
   }
 })

 // CREATE
 app.post('/users/:id/:movieTitle', (req, res) => {
   const { id, movieTitle } = req.params;

   let user = users.find( user => user.id == id );

   if (user) {
     user.favoriteMovies.push(movieTitle);
     res.status(200).send('Movie has been added to Favorites!');
   } else {
     res.status(400).send('no user found.')
   }
 })

 // DELETE
 app.delete('/users/:id/:movieTitle', (req, res) => {
   const { id, movieTitle } = req.params;

   let user = users.find( user => user.id == id );

   if (user) {
     user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieName);
     res.status(200).send('Movie has been removed from Favorites.');
   } else {
     res.status(400).send('no user found.')
   }
 })

 // DELETE
 app.delete('/users/:id', (req, res) => {
   const { id } = req.params;

   let user = users.find( user => user.id == id );

   if (user) {
     users = users.filter( user => user.id != id);
     res.status(200).send('User has been deleted');
   } else {
     res.status(400).send('no user found.')
   }
 })



 app.get('/movies', (req, res) => {
   res.json(topMovies);
 });

 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something Broke!');
 });

 app.listen(8080, () => {
   console.log("Your app is listening on port 8080.");
 });
