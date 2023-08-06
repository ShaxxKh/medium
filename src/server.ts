import { join } from "path";
import autoload from "@fastify/autoload";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function server(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> {
  await fastify.register(autoload, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  await fastify.register(autoload, {
    dir: join(__dirname, "api"),
    indexPattern: /.*route.ts$/,
    dirNameRoutePrefix: false,
    options: opts,
  });

  if (fastify.config.NODE_ENV === "development") {
    fastify.log.info(fastify.printRoutes());
  }
}
