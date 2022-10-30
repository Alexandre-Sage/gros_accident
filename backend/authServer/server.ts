import fastify, { FastifyInstance, RouteShorthandOptions, FastifyBodyParser } from "fastify";
import { signUpRoute } from "./routes/signUp/signUpRoute";
import { loginRoute } from "./routes/login/login";
import env from "@fastify/env";
import mysql, { MySQLPromisePool } from "@fastify/mysql";
//const { log, table, debug, error } = console;
import { UserApiInterface, UserApi } from "./routes/signUp/signUpApi";
import { LoginApi } from "./routes/login/loginApi";
import { JwtApi } from "../sharedModules/jwtApi"
interface MysqlOptionsInterface {
  promise: boolean,
  host: string,
  port: 3306,
  user: string;
  password: string;
  database: string;
  pool: boolean;
  type: string
};


const envSchema = {
  type: "object",
  required: ["PORT", "DB_HOST", "DB_NAME", "DB_PASS"],
  properties: {
    PORT: {
      type: "number",
      default: 3000
    },
    DB_HOST: {
      type: "string"
    },
    DB_NAME: {
      type: "string"
    },
    DB_PASS: {
      type: "string"
    }
  }
}

declare module "fastify" {
  interface FastifyInstance {
    database: any;
    mysql: MySQLPromisePool;
    signUpApi: UserApiInterface;
    loginApi: LoginApi;
    jwtApi: JwtApi;
  }
}

export class Server {
  readonly server: FastifyInstance;
  private dotenvOptions: any;
  private port: number
  private mysqlCredentials: any
  constructor(private routes: any[]) {
    this.server = fastify({
      logger: true,
      jsonShorthand: true
    });
    this.dotenvOptions = {
      dotenv: true,
      schema: envSchema,
      //confKey: "env"
    }
    this.mysqlCredentials = {
      promise: true,
      pool: true,
      host: "127.0.0.1",
      port: 3306,
      user: "alex",
      password: 'Alexandre',
      database: "gros_accident_a_brest",
      type: "pool",
    }
    this.routes = routes;
    this.port = 3000;
  };
  async build() {
    try {
      await this.server.register(mysql, this.mysqlCredentials)
      await this.server.register(env, this.dotenvOptions);
      this.server.signUpApi = new UserApi(this.server)
      this.server.loginApi = new LoginApi(this.server)
      this.server.jwtApi = new JwtApi(process.env.SECRET || "")
      this.routes.map(async route => await this.server.register(route))
    } catch (err) {
      throw err
    }
  };
  async startServer() {
    try {
      await this.build()

      await this.server.listen({ port: this.port });
      const address = this.server.server.address();
      const port = typeof address === "string" ? address : address?.port;
      return this.server;
    } catch (error) {
      console.error(error)
      throw error;
    };
  };
  async stopServer() {
    this.server.close()
  }
}
(async () => await new Server([signUpRoute, loginRoute]).startServer());


