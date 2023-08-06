import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    async function getUsers(
      request: FastifyRequest<{
        Querystring: {
          page: number;
          limit: number;
        };
      }>,
      reply: FastifyReply
    ): Promise<void> {
      const { page, limit } = request.query;

      const post = await fastify.userService.getUsers(page, limit);

      reply.send(post);
    }

    async function createUser(
      request: FastifyRequest<{
        Body: {
          email: string;
          password: number;
        };
      }>,
      reply: FastifyReply
    ): Promise<void> {
      const { email, password } = request.body;

      const post = await fastify.userService.createUser(email, password);

      reply.send(post);
    }

    fastify.decorate("userController", {
      createUser,
      getUsers,
    });
  },
  {
    name: "userController",
    dependencies: ["userService"],
  }
);
