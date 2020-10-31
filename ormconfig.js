const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_PORT } = process.env;

module.exports = {
  type: "postgres",
  host: "postgres",
  port: parseInt(POSTGRES_PORT || "5432", 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: "all",
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  cli: {
    entitiesDir: "src/entity/*.ts",
    migrationsDir: "src/migration",
  },
};
