const fastify = require("fastify")({
    logger: true,
    // http2: true
});
const autoload = require('fastify-autoload')
const path = require('path')
const PORT = 5000;
// register routes
fastify
    .register(require("fastify-swagger"), {
        exposeRoute: true,
        routePrefix: "/docs",
        swagger: {
            info: {
                title: "ارز دیجیتال-api",
            },
        },
    })
    .register(autoload,{
        dir:path.join(__dirname+ '/../','routes'),
        options: {prefix: '/api/v1'},
        ignorePattern: /.*(test|spec).js/
    })
    .register(require('fastify-cors'), (instance) => (req, callback) => {
        let corsOptions;
        // do not include CORS headers for requests from localhost
        if (/localhost/.test) {
            corsOptions = { origin: false }
        } else {
            corsOptions = { origin: true }
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    })

// fastify websocket

// fastify websocket  -endln
// server starter
const start = async () => {
    try {
        await fastify.listen(PORT, '0.0.0.0');
        //fastify.log.info(`Server Started at http://${fastify.server.address().address}:${fastify.server.address().port}`)
        console.log(`Server Started at http://${fastify.server.address().address}:${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start().then(r => r);


module.exports = {
    app: fastify,
};