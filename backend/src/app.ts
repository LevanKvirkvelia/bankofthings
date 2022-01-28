import Fastify from "fastify";
import { AddressInfo } from "net";
import fastifyCors from "fastify-cors";
import fastifyCookie from "fastify-cookie";
import nsUpdatePlugin from "./routes/domains/nsUpdatePlugin";
import mint from "./routes/domains/mintPlugin";
import appsPlugin from "./routes/apps/appsPlugin";

const fastify = Fastify();

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
});

fastify.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error);
  // Send error response
  reply.status(400).send({ ok: false, error: error.message });
});

fastify.register(fastifyCookie);
fastify.register(nsUpdatePlugin);
fastify.register(mint);
fastify.register(appsPlugin);

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) throw err;
  console.log(
    `server listening on ${(fastify.server.address() as AddressInfo).port}`
  );
});
