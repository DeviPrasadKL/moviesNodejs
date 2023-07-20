const mongoose = require('mongoose');

const DB = "mongodb+srv://deviprasad:MongoDBPassword@cluster0.aay5b3y.mongodb.net/First?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useCreateIndex : true,
    // useFindAndModify : false
}).then(()=>{
    console.log("Conneted to Mongo DB");
}).catch(err=> console.log(err))