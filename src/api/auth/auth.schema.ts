import { FastifyInstance, FastifySchema } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const loginSchema: FastifySchema = {
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

    fastify.decorate("authSchema", {
      loginSchema,
    });
  },
  {
    name: "authSchema",
  }
);
