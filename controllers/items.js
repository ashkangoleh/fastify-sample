const {v4: uuidv4} = require('uuid')
let items = require("../views/items").items;
const coinData = require('../models/schemas')

const getItems = async (request, response) => {
    const allCoins = await coinData.find({$exists:true});
    // response.code(200).send({
    //     'status':200,
    //     'result':allCoins
    // });

    if (allCoins === [] || allCoins === '[]' || allCoins === {} || allCoins === null) {
    // if (allCoins === null) {
        response.code(404).send({'result': 'not found'});
    } else {
        response.code(200).send(allCoins);
    }
}
// get single items handler
const getSingleItem =async (request, response) => {
    const {id} = request.params
    const allCoins = await coinData.find({name:id});
    // const item = items.find(item => item.id === id)
    // response.send(allCoins[allCoins.length - 1])
    response.send(allCoins[0])
    // response.send(item)
}
// add item handler
const addItem = (request, response) => {
    const {name} = request.body
    const item = {
        // id: uuidv4(),
        name,
    }
    // items = [...items, item]

    const data = new coinData({
        name: name
    })
    data.save();
    response.code(201).send(data)
}
// delete item handler
const deleteItem = (request, response) => {
    const {id} = request.params
    if ({id} in items) {
        items = items.filter(item => item.id !== id)
        response.send({
            message: `item ${id} has been removed`
        })
    } else {
        response.send({
            message: `item  not found`
        })
    }
}
// update item handler
const updateItem = (request, response) => {
    const {id} = request.params
    const {name} = request.body

    items = items.map(item => (item.id === id ? {id, name} : item)) // if item.id exists return id,name else old item
    item = items.find((item) => item.id === id)
    response.send(item)
}

module.exports = {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem
}