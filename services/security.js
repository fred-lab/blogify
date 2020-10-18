const bcrypt = require("bcryptjs");

/**
 * Hash a string
 * @param {string} value
 * @param {int} salt
 */
const hash = async (value, salt = 10) => {
  try {
    return await bcrypt.hash(value, salt);
  } catch (error) {
    return false;
  }
};

module.exports = {
  hash,
};
