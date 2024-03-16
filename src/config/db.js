const mongoose = require("mongoose")
require('dotenv').config();

const Connection = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to the DB`);
    } catch (error) {
        console.log(`Unable to connect the DB`, error);
    }
}

module.exports = {Connection}