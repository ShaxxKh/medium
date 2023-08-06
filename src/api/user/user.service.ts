import { User } from "@prisma/client";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    async function getUsers(page: number, limit: number): Promise<User[]> {
      const user = fastify.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      return user;
    }

    async function findUserByEmail(email: string): Promise<User | null> {
      const user = fastify.prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    }

    async function createUser(email: string, password: number): Promise<User> {
      const user = fastify.prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return user;
    }

    fastify.decorate("userService", {
      createUser,
      findUserByEmail,
      getUsers,
    });
  },
  {
    name: "userService",
    dependencies: ["prisma"],
  }
);
