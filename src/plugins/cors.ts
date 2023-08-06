import fp from "fastify-plugin";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { FastifyInstance } from "fastify";

async function corsPlugin(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    hideOptionsRoute: true,
  } as FastifyCorsOptions);
}

export default fp(corsPlugin, {
  name: "cors",
  dependencies: ["env"],
});
