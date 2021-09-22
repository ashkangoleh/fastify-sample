const app = require('./config/serverConfig').app


// index path
app.get('/kjhgkjhg', (request, response) => {
    response.send({
        "first-app": "first-app"
    })

});