import { FastifyInstance, FastifySchema } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const getUserPostsSchema: FastifySchema = {
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
        additionalProperties: false,
      },
    };

    const getPostByIdSchema: FastifySchema = {
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    };

    const createPostSchema: FastifySchema = {
      body: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
          },
          content: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    };

    fastify.decorate("postSchema", {
      createPostSchema,
      getPostByIdSchema,
      getUserPostsSchema,
    });
  },
  {
    name: "postSchema",
  }
);
