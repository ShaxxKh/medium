import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
      method: "POST",
      url: "/login",
      schema: fastify.authSchema.loginSchema,
      handler: fastify.authController.loginUser,
    });
  },
  {
    name: "authRoute",
    dependencies: ["authController", "authSchema"],
  }
);
