const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
  uuid = require('uuid'),
  app = express();
  app = express();

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('public'));

  app.use(morgan('common'));

  //Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});



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

 app.get("/", (req, res) => {
   res.send("Welcome To myFlix");
 });


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
