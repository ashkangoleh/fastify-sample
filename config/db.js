'use strict';
const mongoose = require("mongoose");
// const dbUrl = `mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const dbUrl = `mongodb://mongo:27017/test`

async function connect(uri, callback) {
    await mongoose.connect(uri, {
        useNewUrlParser: true
    }).then(() => console.log('Successfully connected to database'))
        .catch((err) => {
            console.error(err);
        });
}

connect(dbUrl).then(r => r)
const Schema = mongoose.Schema;

module.exports = {
    Schema,
    mongoose,

}



