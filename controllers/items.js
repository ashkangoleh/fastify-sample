const axios = require("axios");
const {coin_data,coin_market} = require("../models/coin_model");
const redis = require("../config/cache");
const fk = require('faker');
const getItems = async (request, response) => {
    const allCoins = await coin_data.find({$exists: true});
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
            'status': 'success',
            'data_count': allCoins.length,
            'data': allCoins
        });
    }
};
// get single items handler
const getSingleItem = async (request, response) => {
    let {name} = request.body;
    name = name.toUpperCase();
    const filter = {name: {$in: name}};
    let singleCoin = await coin_data.find(filter);
    if (!singleCoin.length) {
        response.code(404).send({
            status: "error",
            data: `${name}`,
            message: "not found",
        });
    } else {
        response.code(200).send({
            status: "success",
            name: singleCoin[0]['name'],
        });
    }
};
// add item handler
const addItem = async (request, response) => {
    let {name} = request.body;
    name = name.toUpperCase()
    const filter = {name: {"$in": name}};
    const preCheck = await coin_data.find(filter)
    const data = new coin_data({
        name: name,
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
    // // faker data into add url
    // let fake_name = fk.name.firstName()
    // for (let i = 0; i < 1000; i++) {
    //     let fakers = new coin_data({
    //         name: fake_name.toUpperCase()
    //     });
    //         fakers.save((err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //         });
    //     }
};
// delete item handler
const deleteItem = async (request, response) => {
    let result;
    let delSingleCoin;
    const {name} = request.body;
    const filter = {name: {"$in": name}};
    let singleCoin = await coin_data.find(filter);
    if (singleCoin.length) {
        delSingleCoin = await coin_data.deleteOne(filter);
        result = {status: 'success', data: delSingleCoin['deletedCount'], message: `${name} has been removed`};
        response.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    } else {
        response.code(404).send({'status': 'error', 'data': `${name}`, 'message': `${name} not found `});
    }

};
// update item handler
const updateItem = async (request, response) => {
    let {name, updated_name} = request.body;
    const filter = {name: {"$in": name}};
    const update = {name: updated_name.toUpperCase()};
    const nameFilter = await coin_data.find(update)
    if (name !== '' && updated_name !== '') {
        if (nameFilter.length) {
            response.code(409).send({
                status: "error",
                data: `${updated_name}`,
                message: `'${updated_name}' already taken `,
            });
        } else {
            let doc = await coin_data.findOneAndUpdate(filter, update, {
                returnOriginal: false,
                $exists: true,
            })
            if (doc == null) {
                response.code(200).send({
                    status: "error",
                    data: `${name} not found`,
                    message: `'${name}' not found `,
                });

            } else {
                doc.save();
                response.code(201).send({
                    status: "success",
                    message: `${name} updated to ${updated_name}`
                });
            }
        }
    } else {
        response.code(404).send({
            message: "one/all contents are empty"
        })
    }
}
// removeDuplicates data from faker
const removeDuplicates = async (request, response) => {
    let duplicates = []
    let data = await coin_data.aggregate([
            {
                $match: {
                    name: {"$ne": ''}  // discard selection criteria
                }
            },
            {
                $group: {
                    _id: {name: "$name"}, // can be grouped on multiple properties
                    dups: {"$addToSet": "$_id"},
                    count: {"$sum": 1}
                }
            },
            {
                $match: {
                    count: {"$gt": 1}    // Duplicates considered as count greater than one
                }
            }
        ],
        {allowDiskUse: true}       // For faster processing if set is larger
    )
    data.forEach(function (doc) {
        doc.dups.shift();      // First element skipped for deleting
        doc.dups.forEach(function (dupId) {
                duplicates.push(dupId);   // Getting all duplicate ids
            }
        )
    })
    if (duplicates.length) {
        await coin_data.deleteMany({_id: {$in: duplicates}})
        response.code(200).send({
            status: 'success',
            duplicate_data: `${duplicates ? duplicates.length : 0}`,
            message: `${duplicates.length} duplicates removed`
        })
    } else {
        response.code(404).send({
            status: 'error',
            duplicate_data: `${duplicates ? duplicates.length : 0}`,
            message: `duplicates not found`
        })
    }

}
module.exports = {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem,
    removeDuplicates,
};