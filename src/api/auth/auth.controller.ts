import { CookieSerializeOptions } from "@fastify/cookie";
import { User } from "@prisma/client";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const loginUser = async (
      req: FastifyRequest<{
        Body: {
          email: string;
          password: number;
        };
      }>,
      reply: FastifyReply
    ) => {
      const { email, password } = req.body;
      const MILLISECONDS_IN_A_DAY = 86400;

      const user = await fastify.userService.findUserByEmail(email);

      if (!user) {
        throw fastify.httpErrors.forbidden("This user doesn't exist");
      }

      if (password !== user.password) {
        throw fastify.httpErrors.forbidden("Invalid credentials");
      }

      const accessToken = await reply.jwtSign(
        { id: user.id, email: user.email },
        {
          expiresIn: 1 * MILLISECONDS_IN_A_DAY,
        }
      );

      const refreshToken = await reply.jwtSign(
        { id: user.id, email: user.email },

        {
          expiresIn: 7 * MILLISECONDS_IN_A_DAY,
        }
      );

      const isDevEnvironment = fastify.config.NODE_ENV === "development";
      const cookieOptions: CookieSerializeOptions = {
        secure: !isDevEnvironment,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        signed: true,
        maxAge: isDevEnvironment ? 60 * 30 : 60 * 60 * 2,
        domain: fastify.config.HOST,
      };

      reply.setCookie("_act", accessToken, cookieOptions);
      reply.setCookie("_rft", refreshToken, {
        ...cookieOptions,
      });
    };

    const authorize = async (request: FastifyRequest, reply: FastifyReply) => {
      request.jwtVerify((error, payload: Pick<User, "id" | "email">) => {
        if (error) {
          reply.clearCookie("_act", { path: "/" });
          reply.clearCookie("_rft", { path: "/" });

          throw fastify.httpErrors.unauthorized("Unauthorized");
        }

        const { id, email } = payload;

        request.user = {
          id,
          email,
        };

        return;
      });
    };

    fastify.decorate("authController", {
      loginUser,
      authorize,
    });
  },
  {
    name: "authController",
    dependencies: ["env", "userService"],
  }
);
