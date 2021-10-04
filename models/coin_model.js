const {Schema, mongoose} = require("../config/db");

const coinDataSchema = new Schema({
    name: {type: String, required: true},
}, {collection: "coin-data"});
const coinMarketCapSchema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: false},
},{collection:"coin-market"}
)
let coin_data = mongoose.model("coinData",coinDataSchema)
let coin_market = mongoose.model("coinMarket",coinMarketCapSchema)
module.exports = {
    coin_data,
    coin_market,
}