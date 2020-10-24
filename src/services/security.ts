import bcrypt from "bcryptjs";

/**
 * Hash a string
 * @param {string} value
 * @param {int} salt
 */
const hash = async (value: string, salt = 10): Promise<string | boolean> => {
  try {
    return await bcrypt.hash(value, salt);
  } catch (error) {
    return false;
  }
};

export { hash };
