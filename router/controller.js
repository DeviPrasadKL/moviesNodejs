const express = require('express');
const router = express.Router();  // getting router
require('../db/connection');  // Using Database connection 
const MoviesCollection = require('../model/movieSchema'); //To check movie is already there or not

// Get All Movies
router.get('/movies', async (req, res) => {
    try {
        const MovieExists = await MoviesCollection.find();
        if (MovieExists) {
            return res.status(200).send(MovieExists);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

// Get Movie by id 
router.get('/movie/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await MoviesCollection.findOne({ _id: id });
        res.status(200).send(movie);
    } catch (err) {
        return res.status(500).send({ error: err });
    }
});

//This is by using Promises
/* router.post('/add-movie', async(req, res) => {
    const {movieName, hero, gener, rating, poster} = req.body; 
    console.log(movieName);
    if( !movieName || !hero || !gener || !rating || !poster ){
        return res.status(422).send({error:"Please fill all the fields"})
    }

    // To find the existing movie
    MoviesCollection.findOne({movieName:movieName})
    .then((MovieExists)=>{
        if(MovieExists){
            return res.status(422).send({error: "Movie already exists"});
        }
        const moviesCollection = new MoviesCollection({movieName, hero, gener, rating, poster});
        moviesCollection.save().then(() => {
            res.status(200).send({message:"Movie saved successfully"});
        }).catch((err) => { res.status(500).send({message:"Movie not saved successfully"})});
    }).catch ((err) => { res.status(500).send({err : err})});
}) */


//Add Movie
//This is by using Async and await
router.post('/add-movie', async (req, res) => {
    const { movieName, hero, gener, rating, poster } = req.body;
    if (!movieName || !hero || !gener || !rating || !poster) {
        return res.status(422).send({ error: "Please fill all the fields" })
    }

    try {
        // To find the existing movie
        const MovieExists = await MoviesCollection.findOne({ movieName: movieName })
        if (MovieExists) {
            return res.status(422).send({ error: "Movie already exists" });
        }
        const moviesCollection = new MoviesCollection({ movieName, hero, gener, rating, poster });
        // If Movie doesn't exist already then save it
        const MovieSaved = await moviesCollection.save();
        if (MovieSaved) {
            res.status(200).send({ message: "Movie saved successfully" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err });
    }
})

// Update Movie using id 
router.put('/movie/:id', async (req, res) => {
    const { movieName, hero, gener, rating, poster } = req.body;
    const id = req.params.id;
    if (!movieName || !hero || !gener || !rating || !poster) {
        return res.status(422).send({ error: "Please fill all the fields" });
    }
    try {
        const movieUpdate = await MoviesCollection.findByIdAndUpdate(id, { movieName, hero, gener, rating, poster });
        if (movieUpdate) {
            res.status(200).send({ message: "Movie Updated successfully" });
        }
    } catch (err) {
        return res.status(500).send({ error: err });
    }
})

// Delete Movie
router.delete('/movie/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const movieUpdate = await MoviesCollection.deleteOne({ _id: id });
        if (movieUpdate) {
            res.status(200).send({ message: "Movie Deleted successfully" });
        }
    } catch (err) {
        return res.status(500).send({ error: err });
    }
})

module.exports = router;
