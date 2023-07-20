const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

dotenv.config({path:'./config.env'});

//Connect to Mongo DB and usng that file here
require('./db/connection');
// const MoviesCollection = require('./model/movieSchema');

//Userd for cross origin requests
app.use(cors({
    origin: "*"
}));
app.use(express.json());

//using router files here
app.use(require('./router/controller'));
app.listen(PORT);

