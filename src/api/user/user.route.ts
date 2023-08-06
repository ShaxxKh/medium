import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
      method: "GET",
      url: "/users",
      schema: fastify.userSchema.getUsersSchema,
      onRequest: fastify.authController.authorize,
      handler: fastify.userController.getUsers,
    });

    fastify.route({
      method: "POST",
      url: "/users",
      schema: fastify.userSchema.createUserSchema,
      onRequest: fastify.authController.authorize,
      handler: fastify.userController.createUser,
    });
  },
  {
    name: "userRoute",
    dependencies: ["userController", "userSchema", "authController"],
  }
);
