// const connection = require('../config/db');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test')
const Schema = mongoose.Schema;
const coinDataSchema = new Schema({
    name: {type: String, required: true}
}, {collection: 'coin-data'});

module.exports = mongoose.model('coinData', coinDataSchema)