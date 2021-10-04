const app = require('./config/serverConfig').app


// index path
app.get('/', (request, reply) => {
    reply.sendFile('index.html');
});