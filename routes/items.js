const {getItems, getSingleItem, addItem, deleteItem, updateItem, periodHistoryAmount} = require('../controllers/items')
const Items = {
    type: "object",
    properties: {
        id: {type: "integer"}, // if we remove it there is no content as id in response body
        name: {type: "string"},
    },
};
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Items,
            },
        },
    },
    handler: getItems,
};
const getItemOpts = {
    schema: {
        response: {
            200: Items,
        },
    },
    handler: getSingleItem
};
const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                id: {type: 'string'},
                name: {type: 'string',}
            }
        },
        response: {
            201: Items,
        },
    },
    handler: addItem
};
const deleteItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                id: {type: 'string'},
                name: {type: 'string',}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        },
    },
    handler: deleteItem
};
const updateItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                id: {type: 'string'},
                name: {type: 'string',},
                update_name: {type: 'string'}
            }
        },
        response: {
            200: Items,
        },
    },
    handler: updateItem
};
const historyOts = {
    handler: periodHistoryAmount
}

function itemRoutes(app, options, done) {
    // GET all items
    // app.get("/coins", getItemsOpts);
    app.get("/coins", getItems);
    // GET single item
    app.get("/coin/:id", getItemOpts);
    // Add item
    app.post("/coin", postItemOpts)
    // Delete item
    // app.delete("/coin/:id", deleteItemOpts) // params request
    app.delete("/coin", deleteItemOpts) // body request {"name":"name"}
    // UPDATE item
    app.put("/coin", updateItemOpts)
    app.get("/history", historyOts)
    done();
}

module.exports = itemRoutes;