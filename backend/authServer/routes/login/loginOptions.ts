import { RouteShorthandOptions } from "fastify";
import validator from "validator";
import { LoginBodyInterface } from "./login";
export const options: RouteShorthandOptions = {
  schema: {
    headers: {
      type: "object",
      required: ["method", "Content-Type"],
      properties: {
        method: {
          type: "string",
          default: "POST"
        },
        "Content-Type": {
          type: "string",
          default: "application/json",
        }
      }
    },
    body: {
      type: "object",
      required: ["userName", "password"],
      properties: {
        userName: {
          type: "string",
        },
        password: {
          type: "string",
        }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: 'string'
          }
        },
      }
    }
  },
  preHandler: async (request, reply) => {
    reply.headers({ "Content-Type": "application/json" });
    const { password, userName } = request.body as LoginBodyInterface;
    const { isEmpty } = validator;
    if (!isEmpty(password) && !isEmpty(userName)) return
    else if (isEmpty(password)) reply.status(400).send("Password is empty");
    else if (isEmpty(userName)) reply.status(400).send("User name is empty");
  },
  errorHandler: async (error, request, reply) => {
    switch (error.message.split("'")[1]) {
      case "userName":
        return reply.status(400).send({ message: "User name is empty" })
        break;
      case "password":
        return reply.status(400).send({ message: "Password is empty" })
        break;
    }
  }
}