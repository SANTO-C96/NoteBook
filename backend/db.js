
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://singhvns999:DTtmoSGEmFRHu4yu@cluster0.kmpd6iq.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";

//?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;