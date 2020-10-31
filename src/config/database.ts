import { createConnection, Connection, ConnectionOptions } from "typeorm";

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_PORT } = process.env;

const options: ConnectionOptions = {
  type: "postgres",
  host: "postgres",
  port: parseInt(POSTGRES_PORT || "5432", 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: "all",
  entities: [__dirname + "/../entity/*.ts"],
  migrations: [__dirname + "/../migration/*.ts"],
  cli: {
    entitiesDir: __dirname + "/../entity",
    migrationsDir: __dirname + "/../migration",
  },
};

export default async () => await createConnection(options);
