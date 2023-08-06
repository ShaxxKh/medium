import { Post } from "@prisma/client";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    async function getUserPosts(
      page: number,
      limit: number,
      authorId: number
    ): Promise<Post[]> {
      const post = fastify.prisma.post.findMany({
        where: { authorId },
        skip: (page - 1) * limit,
        take: limit,
      });

      return post;
    }

    async function getPostById(id: number): Promise<Post | null> {
      const post = fastify.prisma.post.findUnique({
        where: {
          id,
        },
      });

      return post;
    }

    async function createPost(
      title: string,
      content: string,
      authorId: number
    ): Promise<Post> {
      const post = fastify.prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      return post;
    }

    fastify.decorate("postService", {
      createPost,
      getPostById,
      getUserPosts,
    });
  },
  {
    name: "postService",
    dependencies: ["prisma"],
  }
);
