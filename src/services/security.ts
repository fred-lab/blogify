import bcrypt from "bcryptjs";
import createDebug from "debug";
import { User } from "src/entity/user";
const debug = createDebug("blogify:server");

/**
 * Hash a string
 * @param {string} value
 * @param {int} salt
 */
const hash = async (value: string, salt = 10): Promise<string> => {
  try {
    return await bcrypt.hash(value, salt);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

const authenticate = async (value: string, user: User): Promise<boolean> => {
  try {
    return bcrypt.compare(value, user.password);
  } catch (error) {
    if(typeof error === 'string'){
      throw new Error(error);
    }
    throw new Error()
  }
};

export { hash, authenticate };
