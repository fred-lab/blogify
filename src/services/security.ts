import bcrypt from "bcryptjs";
import createDebug from "debug";
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

export { hash };
