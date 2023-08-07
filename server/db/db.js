const mongoose = require('mongoose');

const mongoURI = ""

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connection to mongo successfully");
    } catch (error) {
        console.log(`Mongo connect error ${error}`);
    }
}

module.exports = connectToMongo;