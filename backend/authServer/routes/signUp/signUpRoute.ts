import fastify, { FastifyInstance, FastifyRequest, RouteHandler, RouteShorthandOptions, } from "fastify";
import { options } from "./signUpOptions";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

export interface RouteBodyInterface extends FastifyRequest {
  password: string;
  userName: string;
  email: string;
  passwordConfirmation: string;
}
const json = (obj: any) => JSON.stringify({ ...obj })
export const signUpRoute = async (server: FastifyInstance) => (
  server.post("/sign-up", options, async (request, reply) => {
    const { ...bodyCopy } = request.body as RouteBodyInterface;
    try {
      await server.signUpApi.createNewUser(bodyCopy)
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