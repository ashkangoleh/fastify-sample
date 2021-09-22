const app = require('./config/serverConfig').app


// index path
// app.get('/', (request, response) => {
//     response.send({
//         "coins list": {
//             method: "GET",
//             routes: "/api/v1/coins"
//         },
//         "get single coin": {
//             method: "POST",
//             routes: "/api/v1/coins/single"
//         },
//         "add coin": {
//             method: "POST",
//             routes: "/api/v1/coin"
//         },
//         "delete coin": {
//             method: "DELETE",
//             routes: "/api/v1/coin"
//         },
//         "update coin": {
//             method: "PUT",
//             routes: "/api/v1/coin"
//         }
//     })
//
// });