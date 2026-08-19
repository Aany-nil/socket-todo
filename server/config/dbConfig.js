const mongoose = require("mongoose");
const dbUrl = process.env.MONGODB_URL

const dbConfig = () => {
    try {
       mongoose.connect(dbUrl)
       console.log("Database connected")
    } catch (error) {
        console.log("Database connect failed")   
    }

}


module.exports = dbConfig;