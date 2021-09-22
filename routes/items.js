const {client} = require("../config/cache");
const {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem,
    periodHistoryAmount,
} = require("../controllers/items");
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
        body: {
            type: "object",
            properties: {
                name: {type: "string"},
            },
            required: ["name"],
        },
    },

    handler: getSingleItem,
};
const postItemOpts = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                id: {type: "string"},
                name: {type: "string"},
            },
        },
        response: {
            201: Items,
        },
    },
    handler: addItem,
};
const deleteItemOpts = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                id: {type: "string"},
                name: {type: "string"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    status: {type: "string"},
                    data: {type: "string"},
                    message: {type: "string"},
                },
            },
        },
    },
    handler: deleteItem,
};
const updateItemOpts = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"},
                update_name: {type: "string"},
            },
        },
        response: {
            201: {
                status: {type: "string"},
                data: {type: "string"},
                message: {type: "string"}
            },
            200: {
                status: {type: "string"},
                data: {type: "string"},
                message: {type: "string"}
            }

        },
    },
    handler: updateItem,
};
const historyOts = {
    handler: periodHistoryAmount,
};


function itemRoutes(app, options, done) {
    // GET all items
    // app.get("/coins", getItemsOpts);
    app.get("/coins", getItems);
    // GET single item
    // app.get("/coin/:id", getItemOpts);
    app.post("/coins/single", getItemOpts); // for getting single data from body we have 2 use put or post (request body just work on POST or PUT)
    // app.get("/coin/:name", getSingleItem);
    // Add item
    app.post("/coin", postItemOpts);
    // Delete item
    // app.delete("/coin/:id", deleteItemOpts) // params request
    app.delete("/coin", deleteItemOpts); // body request {"name":"name"}
    // UPDATE item
    app.put("/coin", updateItemOpts);
    app.get("/", historyOts);
    done();

}


module.exports = itemRoutes;