import fastify, { FastifyInstance, RouteHandler, RouteShorthandOptions, } from "fastify";
import crypto from "crypto"
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export declare interface CustomErrorInterface extends Error {
  httpStatus: number,
  message: string,
  devMessage: string
};

export class CustomError extends Error {
  constructor(message: string, public httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
    this.message = message;
    Error.captureStackTrace(this, this.constructor)
  }
}


export type UserApiInterface = UserApi;
export interface RouteBodyInterface {
  password: string;
  userName: string;
  email: string;
  passwordConfirmation: string;
}
export class UserApi {
  constructor(private server: FastifyInstance) {
    this.server = server
  };
  private async hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    return { hashedPassword: crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`), salt: salt }
  }
  private errorHandling = async (error: Error) => {
    switch (error.message) {
      case `Duplicate entry 'test@test.com' for key 'email'`:
        return "Mail already exists"
        break;
    }
  };
  private async passwordConfirmation(password: string, passwordConfirmation: string) {
    password === passwordConfirmation ? Promise.resolve(true) : Promise.reject(new Error("Passwords do not match"))
  }
  private async registerUser({ userName, password, email }: Omit<RouteBodyInterface, "passwordConfirmation">) {
    try {
      const { salt, hashedPassword } = await this.hashPassword(password)
      return await this.server.mysql.query(
        `INSERT INTO users (user_name, password, email, salt)
          VALUES('${userName}','${hashedPassword}','${email}', ${salt})`
      )
    } catch (error: any) {
      throw new CustomError(await this.errorHandling(error) || "", 400)
    }
  }
  public async createNewUser({ userName, password, email, passwordConfirmation }: RouteBodyInterface) {
    try {
      await this.passwordConfirmation(password, passwordConfirmation);
      await this.registerUser({ userName, password, email });
    } catch (error) {
      throw error
    }
  }
}