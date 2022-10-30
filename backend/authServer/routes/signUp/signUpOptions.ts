import { RouteShorthandOptions } from "fastify";
import validator from "validator";
import { RouteBodyInterface } from "./signUpRoute";
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
      required: ["userName", "password", "email", "passwordConfirmation"],
      properties: {
        userName: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        passwordConfirmation: {
          type: "string",
        }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          hello: {
            type: 'string'
          }
        },
      }
    }
  },
  preHandler: async (request, reply) => {
    reply.headers({ "Content-Type": "application/json" });
    const { password, passwordConfirmation, email, userName } = request.body as RouteBodyInterface;
    const { isEmail, isEmpty } = validator;
    if (isEmail(email) && !isEmpty(password) && !isEmpty(passwordConfirmation) && !isEmpty(userName)) return
    else if (!isEmail(email)) reply.status(400).send("Invalid email");
    else if (isEmpty(password)) reply.status(400).send("Password is empty");
    else if (isEmpty(userName)) reply.status(400).send("User name is empty");
    else if (isEmpty(passwordConfirmation)) reply.status(400).send("Password confirmation is empty");
  },
  errorHandler: async (error, request, reply) => {
    switch (error.message.split("'")[1]) {
      case "passwordConfirmation":
        return reply.status(400).send({ message: "Password confirmation is empty" })
        break;
      case "userName":
        return reply.status(400).send({ message: "User name is empty" })
        break;
      case "password":
        return reply.status(400).send({ message: "Password is empty" })
        break;
      case "email":
        return reply.status(400).send({ message: "Email is empty" })
        break;
    }
  }
}