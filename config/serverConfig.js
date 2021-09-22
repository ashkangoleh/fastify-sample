const fastify = require("fastify")({
    logger: true,
    // http2: true
});
const PORT = 5000;
// routes modules
const itemsRoutes = require("../routes/items");
// end line of routes
// register routes
fastify.register(require("fastify-swagger"), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "ارز دیجیتال-api",
        },
    },
});
fastify.register(itemsRoutes);
// end line of register routes
// server starter
const start = async() => {
    try {
        await fastify.listen(PORT, '0.0.0.0');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
// start().then(() => console.log(fastify.log))
start();
// end line of server starter

module.exports = {
    app: fastify,
};