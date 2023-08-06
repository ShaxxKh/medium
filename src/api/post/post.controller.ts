import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    async function getUserPosts(
      request: FastifyRequest<{
        Querystring: {
          page: number;
          limit: number;
        };
      }>,
      reply: FastifyReply
    ): Promise<void> {
      const { id } = request.user;
      const { page, limit } = request.query;

      const posts = await fastify.postService.getUserPosts(page, limit, id);

      reply.send(posts);
    }

    async function getPostById(
      request: FastifyRequest<{
        Params: {
          id: number;
        };
      }>,
      reply: FastifyReply
    ): Promise<void> {
      const { id } = request.params;

      const post = await fastify.postService.getPostById(id);

      if (!post) {
        throw fastify.httpErrors.notFound("Post with given id is not found");
      }

      reply.send(post);
    }

    async function createPost(
      request: FastifyRequest<{
        Body: {
          title: string;
          content: string;
        };
      }>,
      reply: FastifyReply
    ): Promise<void> {
      const { id } = request.user;
      const { title, content } = request.body;

      const post = await fastify.postService.createPost(title, content, id);

      reply.send(post);
    }

    fastify.decorate("postController", {
      createPost,
      getPostById,
      getUserPosts,
    });
  },
  {
    name: "postController",
    dependencies: ["postService"],
  }
);
