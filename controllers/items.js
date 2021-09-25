const axios = require("axios");
const coinData = require("../models/coins");
const redis = require("../config/cache");

const getItems = async (request, response) => {
    const allCoins = await coinData.find({$exists: true});
    //-------------------------------------
    // const setFromCache = redis.setex("allCoins", 30, `${allCoins}`);
    //-------------------------------------------
    if (allCoins.length === 0) {
        response.code(404).send({result: "not found"});
    } else {
        // const getFromCache = redis.get("allCoins", (err, val) => {
        // if (err) {
        // response.send(err);
        // return
        // }
        // response.code(200).send(val);
        // })
        response.code(200).send({
            'status':'success',
            'data_count' :allCoins.length,
            'data':allCoins
        });
    }
};

// get single items handler
const getSingleItem = async (request, response) => {
    const {name} = request.body;
    const Regex = new RegExp(name, 'i');
    const filter = {name: {"$regex": Regex}};
    let singleCoin = await coinData.find(filter);
    if (singleCoin.length === 0) {
        response.code(404).send({
            status: "error",
            data: `${name}`,
            message: "not found",
        });
    } else {
        response.code(200).send(singleCoin);
    }
};

// add item handler
const addItem = async (request, response) => {
    const {name} = request.body;
    const Regex = new RegExp(name, 'i');
    const filter = {name: {"$regex": Regex}};
    const preCheck = await coinData.find(filter)
    const data = new coinData({
        name: name.toUpperCase(),
    });
    if (!preCheck.length) {
        await data.save();
        response.code(201).send(data);
    } else {
        response.code(409).send({
            'status': 'error',
            'data': `${name}`,
            'message': `'${name}' already exist`
        })
    }
};
// delete item handler
const deleteItem = async (request, response) => {
    const {name} = request.body;
    const Regex = new RegExp(name, 'i');
    const filter = {name: {"$regex": Regex}};
    let singleCoin = await coinData.find(filter);
    if (!singleCoin.length) {
        response.code(404).send({'status': 'error', 'data': `${name}`, 'message': `${name} not found `});
    } else {
        let delSingleCoin = await coinData.deleteOne(filter)
        let result = {status: 'success', data: delSingleCoin['deletedCount'], message: `${name} has been removed`}
        response.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    }
};
// update item handler
const updateItem = async (request, response) => {
    const {name, updated_name} = request.body;
    const Regex = new RegExp(name, 'i');
    const filter = {name: {"$regex": Regex}};
    const update = {name: updated_name.toUpperCase()};
    let nameFilter = await coinData.find(update)

    if (!nameFilter.length) {
        let doc = await coinData.findOneAndUpdate(filter, update, {
            returnOriginal: false,
            $exists: true,
        });
        if (doc != null) {
            doc.save();
            response.code(201).send({
                status: "success",
                data: `${updated_name}`,
                message: `${name} updated to ${updated_name}`
            });
        } else {
            response.code(200).send({
                status: "error",
                data: `${name} not found`,
                message: `'${name}' not found `,
            });

        }
    } else {
        response.code(200).send({
            status: "error",
            data: `${updated_name}`,
            message: `'${updated_name}' already taken `,
        });

    }
}
module.exports = {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem,
};