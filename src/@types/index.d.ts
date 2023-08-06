import {
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify";
import { Post, PrismaClient, User } from "@prisma/client";

type JWTUser = {
  id: number;
  email: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTUser;
    user: JWTUser;
  }
}

declare module "fastify" {
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
  > {
    request: RawRequest;
    reply: RawReply;
    prisma: PrismaClient;
    config: {
      NODE_ENV: string;
      JWT_SECRET: string;
      JWT_COOKIE_TOKEN: string;
      HOST: string;
      COOKIE_SECRET: string;
      PORT: number;
    };
    authSchema: {
      loginSchema: FastifySchema;
    };
    authController: {
      loginUser(
        request: FastifyRequest<{
          Body: { email: string; password: number };
        }>,
        reply: FastifyReply
      ): Promise<void>;
      authorize(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    };
    postSchema: {
      createPostSchema: FastifySchema;
      getPostByIdSchema: FastifySchema;
      getUserPostsSchema: FastifySchema;
    };
    postController: {
      createPost(
        request: FastifyRequest<{
          Body: { title: string; content: string };
        }>,
        reply: FastifyReply
      ): Promise<void>;
      getPostById(
        request: FastifyRequest<{
          Params: { id: number };
        }>,
        reply: FastifyReply
      ): Promise<void>;
      getUserPosts(
        request: FastifyRequest<{
          Querystring: { page: number; limit: number };
        }>,
        reply: FastifyReply
      ): Promise<void>;
    };
    postService: {
      createPost(
        title: string,
        content: string,
        authorId: number
      ): Promise<Post>;
      getPostById(id: number): Promise<Post | null>;
      getUserPosts(
        page: number,
        limit: number,
        authorId: number
      ): Promise<Post[]>;
    };
    userSchema: {
      createUserSchema: FastifySchema;
      getUsersSchema: FastifySchema;
    };
    userController: {
      createUser(
        request: FastifyRequest<{
          Body: { email: string; password: number };
        }>,
        reply: FastifyReply
      ): Promise<void>;
      getUsers(
        request: FastifyRequest<{
          Querystring: { page: number; limit: number };
        }>,
        reply: FastifyReply
      ): Promise<void>;
    };
    userService: {
      createUser(email: string, password: number): Promise<User>;
      findUserByEmail(email: string): Promise<User | null>;
      getUsers(page: number, limit: number): Promise<User[]>;
    };
  }
}
