import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const { COOKIE_SECRET } = fastify.config;

    await fastify.register(cookie, {
      secret: COOKIE_SECRET,
    } as FastifyCookieOptions);
  },
  {
    name: "cookie",
    dependencies: ["env"],
  }
);
