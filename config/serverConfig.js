const fastify = require("fastify")({
    // logger: true,
    // http2: true
});
require('dotenv').config();
const autoload = require('fastify-autoload');
const fastifySwagger = require('fastify-swagger');
const fastifyCors = require('fastify-cors');
const path = require('path');
const PORT = process.env.PORT;
const axios = require('axios')

// register routes

fastify
    .register(fastifySwagger, {
        exposeRoute: true,
        routePrefix: "/",
        swagger: {
            info: {
                title: "ارز دیجیتال-api",
                description: "simple CRUD",
                version: "1.0.0"
            },
            host: 'localhost:5000',
            consumes: ['application/json','application/plaintext'],
            produces: ['application/json','application/plaintext'],
            // schemes: ['','http','https']
        }
    })
    .register(autoload, {
        dir: path.join(__dirname + '/../', 'routes'),
        options: {prefix: '/api/v1'},
        ignorePattern: /.*(test|spec).js/
    })
    .register(fastifyCors, (instance) => (req, callback) => {
        let corsOptions;
        // do not include CORS headers for requests from localhost
        if (!/localhost/.test) { //remove ! if need to block localhost requests
            corsOptions = {origin: false}
        } else {
            corsOptions = {origin: true}
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    })
// fastify websocket
fastify.register(require('fastify-websocket'), {
    options: {maxPayload: 1048576}
})


fastify.route({
    method: 'GET',
    url: '/ws/',
    handler: async(req, reply) => {
        reply.setEncoding('utf8')
        let msg = req.params
        if (msg.length) {
        }
    },
    wsHandler: async (conn, req) => {
        conn.setEncoding('utf8')
            let joke = await axios.get('https://api.chucknorris.io/jokes/random').then(r => r.data)
            conn.socket.send(joke['value'])
    }
})
// fastify websocket  -endln
// server starter
const start = async () => {
    try {
        await fastify.listen(PORT, process.env.SERVER_IP_ADDRESS);
        //fastify.log.info(`Server Started at http://${fastify.server.address().address}:${fastify.server.address().port}`)
        console.log(`Server Started at http://${fastify.server.address().address}:${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error);
        console.log(fastify.log.error(error))
        process.exit(1);
    }
};

start().then(r => r);


module.exports = {
    app: fastify,
};