import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
      method: "GET",
      url: "/userPosts",
      schema: fastify.postSchema.getUserPostsSchema,
      onRequest: fastify.authController.authorize,
      handler: fastify.postController.getUserPosts,
    });

    fastify.route({
      method: "GET",
      url: "/posts/:id",
      schema: fastify.postSchema.getPostByIdSchema,
      onRequest: fastify.authController.authorize,
      handler: fastify.postController.getPostById,
    });

    fastify.route({
      method: "POST",
      url: "/posts",
      schema: fastify.postSchema.createPostSchema,
      onRequest: fastify.authController.authorize,
      handler: fastify.postController.createPost,
    });
  },
  {
    name: "postRoute",
    dependencies: ["postController", "postSchema", "authController"],
  }
);
