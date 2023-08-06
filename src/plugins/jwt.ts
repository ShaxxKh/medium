import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const { JWT_SECRET, JWT_COOKIE_TOKEN } = fastify.config;

    await fastify.register(jwt, {
      secret: JWT_SECRET,
      cookie: {
        cookieName: JWT_COOKIE_TOKEN,
        signed: true,
      },
    });
  },
  {
    name: "jwt",
    dependencies: ["env", "cookie"],
  }
);
