const { Sequelize } = require("sequelize");
const debug = require("debug")("blogify:server");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}`
);

const init = async () => {
  try {
    await sequelize.authenticate();
    debug(`Connection to Postgres has been established successfully on port ${POSTGRES_PORT}`);
  } catch (error) {
    debug("Unable to connect to the database:", error);
  }
};

module.exports = { init };
