import { FastifyInstance } from "fastify";
import { LoginBodyInterface } from "./login"
interface SqlResponseInterface {
  password: string,
  salt: string
}
export class LoginApi {
  constructor(private server: FastifyInstance) {
    this.server = server;
  }
  async getUserPassword(userName: string) {
    const data = await this.server.mysql.query(
      `SELECT 'password', 'salt' FROM users WHERE user_name='${userName}'`
    );
    console.log(data)
    return { dataBasePassword: "", salt: "" }
  }
  async checkPassword({ userName, password }: LoginBodyInterface) {
    const { dataBasePassword, salt } = await this.getUserPassword(userName)

  }
  async getUserInfo() {

  }
}