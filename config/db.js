'use strict';
const mongoose = require("mongoose");
async function connect(uri, callback) {
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true
    }).then(() => console.log('Successfully connected to database'))
        .catch((err) => {
            console.error(err);
        });
}
async function main() {
    const uri = 'mongodb://localhost:27017/test';
    await connect(uri);
}
main().then(r => r);
const Schema = mongoose.Schema;

module.exports = {
    Schema,
    mongoose,

}