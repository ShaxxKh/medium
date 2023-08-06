import { FastifyInstance, FastifySchema } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const getUsersSchema: FastifySchema = {
      querystring: {
        type: "object",
        properties: {
          page: {
            type: "number",
            default: 1,
          },
          limit: {
            type: "number",
            default: 10,
          },
        },
      },
    };

    const createUserSchema: FastifySchema = {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "number",
          },
        },
      },
    };

    fastify.decorate("userSchema", {
      createUserSchema,
      getUsersSchema,
    });
  },
  {
    name: "userSchema",
  }
);
