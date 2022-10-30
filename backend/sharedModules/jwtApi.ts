import jwt from "jsonwebtoken";
//import jwt from "@fastify/jwt";

export class JwtApi {
  constructor(private secret: string) {
    this.secret = secret;
  }
  setJsonWebToken(object: object | string | Buffer) {
    return jwt.sign(object, this.secret)
  }
  async decodeJsonWebToken(token: string) {
    try {
      jwt.verify(token, this.secret)
    } catch (error) {
      throw error
    }
  }
}