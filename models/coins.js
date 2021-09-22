const { Schema, mongoose } = require("../config/db");

const coinDataSchema = new Schema({
    name: { type: String, required: true },
}, { collection: "coin-data" });

module.exports = mongoose.model("coinData", coinDataSchema);