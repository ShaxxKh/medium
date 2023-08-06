import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import env, { FastifyEnvOptions } from "@fastify/env";

async function envPlugin(fastify: FastifyInstance) {
  await fastify.register(env, {
    confKey: "config",
    dotenv: true,
    data: process.env,
    schema: {
      type: "object",
      required: [
        "DB_URL",
        "JWT_SECRET",
        "JWT_COOKIE_TOKEN",
        "HOST",
        "COOKIE_SECRET",
        "PORT",
      ],
      properties: {
        NODE_ENV: {
          type: "string",
          default: "development",
        },
        DB_URL: {
          type: "string",
        },
        JWT_SECRET: {
          type: "string",
        },
        JWT_COOKIE_TOKEN: {
          type: "string",
        },
        HOST: {
          type: "string",
        },
        PORT: {
          type: "number",
        },
        COOKIE_SECRET: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
  } as FastifyEnvOptions);
}

export default fp(envPlugin, {
  name: "env",
});
