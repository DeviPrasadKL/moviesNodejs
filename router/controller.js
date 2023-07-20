const express = require('express');
const router = express.Router();  // getting router
require('../db/connection');  // Using Database connection 
const MoviesCollection = require('../model/movieSchema'); //To check movie is already there or not

const apiData = require("../db.json");


router.get('/movies', async (req, res) => {
    try{
        const MovieExists = await MoviesCollection.find();
        if (MovieExists) {
            return res.status(200).send(MovieExists);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error:err});
    }
    // res.status(200).send(apiData.movies);
});

router.get('/movies:id', (req, res) => {
    res.status(200).send(apiData.movies.find(movie => movie.id == req.params.id));
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
        res.status(500).send({error:err});
    }
})


module.exports = router;
