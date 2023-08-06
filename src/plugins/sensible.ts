import fp from 'fastify-plugin';
import sensible, { SensibleOptions } from '@fastify/sensible';
import { FastifyInstance } from 'fastify';

async function sensiblePlugin(fastify: FastifyInstance): Promise<void> {
  await fastify.register(sensible, {
    errorHandler: false,
  } as SensibleOptions);
}

export default fp(sensiblePlugin);
