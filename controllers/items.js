const axios = require("axios");
const coinData = require("../models/coins");
const redis = require("../config/cache");
const column_data_id_2 = require('./manipulated_column_data')

function one_year_ago() {
    return new Date(
        new Date().setFullYear(
            new Date().getFullYear() - 1,
            new Date().getMonth() + 1, 1
        )
    ).getTime().toLocaleString().split(",").join('');
}

function nowDateLive() {
    return new Date().getTime().toLocaleString().split(",").join('');
}


// sort function for duplicate indexes
const uniqSort = (arr = []) => {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i]]) {
            map[arr[i]] = true;
            res.push(arr[i]);
        }
    }
    return res.sort((a, b) => a - b);
};
// end of line sort function for duplicate indexes

const periodHistoryAmount = async (request, response) => {
    const historyUrl = `https://api.arzdigital.com/history/?gethistory=2&from=${one_year_ago()}&to=${nowDateLive()}`;
    const history = await axios.get(historyUrl);
    let data = history.data["price"];
    let modify_data = [];
    let date_check = [];
    let modify_duplicate_result = [];
    let semi_final_result = [];
    data.forEach((element) => {
        if (element[0] > one_year_ago()) {
            modify_data.push(element);
            modify_data.forEach((element) => {
                const Day = new Date(element[0]).toUTCString();
                const fullTimeCheck = Day.split(" ")[1] + Day.split(" ")[2];
                date_check.push(fullTimeCheck, element[1]);
            });
        }
    });
    const sorter = uniqSort(date_check);
    modify_duplicate_result.push(sorter);
    let start = 0;
    let end = 1;
    while (1) {
        if (modify_duplicate_result[0][start] != null) {
            semi_final_result.push([
                modify_duplicate_result[0][start],
                modify_duplicate_result[0][end],
            ]);
            start += 2;
            end += 2;
        } else {
            break;
        }
    }
    const finalData = column_data_id_2(semi_final_result)
    response.code(200).send({
        'status': 'success',
        data: finalData,
    });
};

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
        response.code(200).send(allCoins);
    }
};

// get single items handler
const getSingleItem = async (request, response) => {
    const {name} = request.body;
    const filter = {name: name};
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
    const filter = await coinData.find({name: name})
    const data = new coinData({
        name: name,
    });
    if (!filter.length) {
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
    let singleCoin = await coinData.find({name: name});
    if (!singleCoin.length) {
        response.code(404).send({'status': 'error', 'data': `${name}`, 'message': `${name} not found `});
    } else {
        let delSingleCoin = await coinData.deleteOne({name: name})
        let result = {status: 'success', data: delSingleCoin['deletedCount'], message: `${name} has been removed`}
        response.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    }
};
// update item handler
const updateItem = async (request, response) => {
    const {name, updated_name} = request.body;
    const filter = {name: name};
    const update = {name: updated_name};
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
                message:`${name} updated to ${updated_name}`
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
    // periodHistoryAmount,
};