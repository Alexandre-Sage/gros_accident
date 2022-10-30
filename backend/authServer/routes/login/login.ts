import fastify, { FastifyInstance, FastifyRequest, RouteHandler, RouteShorthandOptions, } from "fastify";
import { options } from "./loginOptions";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

export interface LoginBodyInterface {
  userName: string;
  password: string;
}

const json = (obj: any) => JSON.stringify({ ...obj })
export const loginRoute = async (server: FastifyInstance) => (
  server.post("/login", options, async (request, reply) => {
    console.log(request.body)
    const { ...bodyCopy } = request.body as LoginBodyInterface
    try {
      return json({ message: "Acount creation sucessfull" })
    } catch (error: any) {
      reply.status(error.httpStatus)
      return json({
        message: error.message,
        error: true
      })
    }
  })
);