const {getItems, getSingleItem, addItem,deleteItem,updateItem} = require('../controllers/items')
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
        response: {
            200:{
                type:'object',
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
        response: {
            200: Items,
        },
    },
    handler: updateItem
};

function itemRoutes(app, options, done) {
    // GET all items
    // app.get("/coins", getItemsOpts);
    app.get("/coins", getItems);

    // GET single item
    app.get("/coin/:id", getItemOpts);
    // Add item
    app.post("/coin", postItemOpts)
    // Delete item
    app.delete("/coin/:id", deleteItemOpts)
    // UPDATE item
    app.put("/coin/:id", updateItemOpts)

    done();
}

module.exports = itemRoutes;