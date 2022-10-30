import  NodeEnvironment from 'jest-environment-node'
import {server} from '../server'
import { signUpRoute } from '../routes/signUp/signUpRoute'
export default class FastifyEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    //const serverInstance=await server(4000,[signUpRoute])
    //this.global.server = serverInstance
  }
}

