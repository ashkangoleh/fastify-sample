const axios = require('axios');
let items = require("../views/items").items;
const coinData = require('../models/schemas')

function one_year_ago() {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 1, new Date().getMonth() + 1, 1)).getTime()
}

function nowDateLive() {
    return new Date().getTime()
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
    return res.sort((a, b) => a - b)
};
// end of line sort function for duplicate indexes

const periodHistoryAmount = async (request, response) => {

    const history = await axios.get(`https://api.arzdigital.com/history/?gethistory=2&from=${one_year_ago()}&to=${nowDateLive()}`)
    let data = history.data["price"]
    let modify_data = []
    let date_check = []
    let modify_duplicate_result = []
    let semi_final_result = []
    data.forEach((element) => {
        if (element[0] >= one_year_ago()) {
            modify_data.push(element)

            modify_data.forEach((element) => {
                const Day = new Date(element[0]).toUTCString();
                const fullTimeCheck = Day.split(' ')[1] + Day.split(' ')[2]
                // const fullTimeCheck = Day.split(' ')[2]
                date_check.push(fullTimeCheck, element[1])
            })
        }
    })
    const sorter = uniqSort(date_check)
    modify_duplicate_result.push(sorter)
    let start = 0
    let end = 1
    while (1) {
        if (modify_duplicate_result[0][start] != null) {
            semi_final_result.push([modify_duplicate_result[0][start], modify_duplicate_result[0][end]])
            start += 2
            end += 2
        } else {
            break
        }
    }

    response.send({
        semi_final_result: semi_final_result
    })
}


const getItems = async (request, response) => {
    const allCoins = await coinData.find({$exists: true});

    if (allCoins === [] || allCoins === '[]' || allCoins === {} || allCoins === null) {
        // if (allCoins === null) {
        response.code(404).send({'result': 'not found'});
    } else {
        response.code(200).send(allCoins);
    }
}
// get single items handler
const getSingleItem = async (request, response) => {
    const {id} = request.params
    const allCoins = await coinData.find({name: id});
    // response.send(allCoins[allCoins.length - 1])
    response.send(allCoins[0])
    // response.send(item)
}
// add item handler
const addItem = (request, response) => {
    const {name} = request.body
    const data = new coinData({
        name: name
    })
    data.save();
    response.code(201).send(data)
}
// delete item handler
const deleteItem = async (request, response) => {
    // const {id} = request.params
    // if ({id} in items) {
    //     items = items.filter(item => item.id !== id)
    //     response.send({
    //         message: `item ${id} has been removed`
    //     })
    // } else {
    //     response.send({
    //         message: `item  not found`
    //     })
    // }
    // const {id} = request.params
    const {name} = request.body
    // response.send(allCoins[allCoins.length - 1])
    let allCoins = await coinData.find({name: name})
    if (allCoins[0] === '{}' || allCoins[0] === '[]' || allCoins[0] === undefined) {
        response.send(`${name} not found`)
    } else {
        let allCoins = await coinData.find({name: name}).remove().exec()
        response.send(`${name} has been removed`)
    }
}
// update item handler
const updateItem = async (request, response) => {
    const {id} = request.body
    const {name,updated_name} = request.body
    const allCoins = await coinData.find({name: name});
    console.log(allCoins[0].name)
    allCoins[0].name = updated_name;
    allCoins.save();
    // items = items.map(item => (item.id === id ? {id, name} : item)) // if item.id exists return id,name else old item
    // item = items.find((item) => item.id === id)
    response.send(allCoins)
}

module.exports = {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem,
    periodHistoryAmount,
}