const {client} = require("../config/cache");
const {
    getItems,
    getSingleItem,
    addItem,
    deleteItem,
    updateItem,
    // periodHistoryAmount,
    removeDuplicates,
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
                description: 'Successful response',
                type: "object",
                properties: {
                    status: {type: "string", example: 'success'},
                    data_count: {type: "integer", example: 10},
                    data: {
                        type: "array", example: '{\n' +
                            '      "_id": "614b1942accac0847b7be143",\n' +
                            '      "name": "BTC",\n' +
                            '      "__v": 0\n' +
                            '    }'
                    },
                },
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
                name: {type: "string", example: 'BTC', message: 'cryptocurrency coin name'},
            },
            required: ["name"],
        },
        response: {
            200: {
                description: 'Not Found Response',
                type: "object",
                properties: {
                    status: {type: "string", example: 'success'},
                    name: {type: "string"},
                }
            },
            404: {
                description: 'Not Found Response',
                type: "object",
                properties: {
                    status: {type: "string", example: 'success'},
                    data: {type: "string", example: 'current request body'},
                    message: {type: "string", example: 'not found'}
                }
            },
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
                // id: {type: "string",value:"value will set by DB",example:'614b1942accac0847b7be143'},
                name: {type: "string", value: 'BTC', example: "BTCUSDT", message: "use coin name to create"},
            },
        },
        response: {
            201: {
                description: 'Successful response',
                type: "object",
                properties: {
                    name: {type: "string", value: 'BTC', example: 'BTC'}
                }
            },
            409: {
                description: 'Conflict/Exists response',
                type: "object",
                properties: {
                    status: {type: "string", example: "error"},
                    data: {type: "string", example: "BTCUSDT"},
                    message: {type: "string", example: "'BTCUSDT' already exist"}
                }
            }
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
                // id: {type: "string",value:"value will set by DB",example:'614b1942accac0847b7be143'},
                name: {type: "string", value: 'BTC', example: "BTCUSDT", message: "use coin name to delete"},
            },
        },
        response: {
            200: {
                description: 'Successful Response',
                type: "object",
                properties: {
                    status: {type: "string", example: 'success',},
                    data: {type: "string", example: 'BTCUSDT'},
                    message: {type: "string", example: 'BTCUSDT removed'},
                },
            },
            404: {
                description: 'Not Found Response',
                type: "object",
                properties: {
                    status: {type: "string", example: 'error',},
                    data: {type: "string", example: 'BTCUSDT'},
                    message: {type: "string", example: 'BTCUSDT not found'},
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
                status: {type: "string", example: 'success'},
                message: {type: "string", example: `BTC updated to BTCUSDT`}
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
const removeDuplicatesOpts = {
    schema: {
        response: {
            200: {
                status: {type: "string", example: 'success'},
                duplicate_data: {type: "integer"},
                message: {type: "string", example: `duplicates removed`}
            },
            404: {
                status: {type: "string", example: 'success'},
                duplicate_data: {type: "integer"},
                message: {type: "string", example: `duplicates removed`}
            }
        }
    },
    handler: removeDuplicates,

}
// const historyOts = {
//     handler: periodHistoryAmount,
// };


function itemRoutes(app, options, done) {

    // GET all items
    app.get("/coins", getItemsOpts);
    // app.get("/coins", getItems);
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
    app.get("/rm", removeDuplicatesOpts);
    // app.get("/", historyOts);
    done();

}


module.exports = itemRoutes;