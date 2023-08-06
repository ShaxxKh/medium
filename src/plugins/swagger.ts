import fp from "fastify-plugin";
import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

const version = process.env.npm_package_version;

async function swaggerGenerator(fastify: FastifyInstance) {
  const { HOST, PORT } = fastify.config;

  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "Medium Backend API",
        description: "Medium Backend API documentation",
        version,
      },
      host: `${HOST}:${PORT}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  } as FastifyDynamicSwaggerOptions);

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
  });
}

export default fp(swaggerGenerator, {
  name: "swagger",
  dependencies: ["env"],
});
