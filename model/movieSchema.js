const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName : {
        type: String,
        required: true
    },
    hero : {
        type: String,
        required: true
    },
    gener : {
        type: String,
        required: true
    },
    rating : {
        type: String,
        required: true
    },
    poster : {
        type: String,
        required: true
    } 
})

const MoviesCollection = mongoose.model('Movies', movieSchema);

module.exports = MoviesCollection;