
import Fastify from "fastify";
import fp from "fastify-plugin";
import { loginRoute } from "../routes/login/login";
import { signUpRoute } from "../routes/signUp/signUpRoute";
import { /*server,*/Server } from "../server";
//"test": "mocha --loader=ts-node/esm --extension ts,js 'test/**/main.test.ts'"

describe("TEST", function (this: any) {
  //beforeAll(async () => {
  //  return this.server=await server(4000, [signUpRoute]);
  //})
  it("Sign up test", async () => {
    const server = await new Server([signUpRoute]).startServer();
    try {
      const response = await server.inject({
        url: "/sign-up",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        payload: {
          userName: "test",
          email: "test@test.com",
          password: "",
          passwordConfirmation: "test"
        }
      });
      expect(response).toHaveProperty("statusCode");
      expect(response).toHaveProperty("headers");
      expect(response.statusCode).toBe(200)
    } catch (err) {
      throw err
    }
  });
  it.only("", async () => {
    const server = await new Server([loginRoute]).startServer();

    try {
      const response = await server.inject({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        payload: {
          userName: "test",
          password: "test",
        }
      });
      expect(response).toHaveProperty("statusCode");
      expect(response).toHaveProperty("headers");
      expect(response.statusCode).toBe(200)
    } catch (err) {
      throw err
    }
  });
});

