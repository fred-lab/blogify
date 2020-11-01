#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app";
import createDebug from "debug";
import http from "http";
import createDatabaseConnection from "../config/database";

const debug = createDebug("blogify:server");

/**
 * Get port from environment and store in Express.
 */
const port = process.env.APP_PORT || "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Connect to database
 * Listen on provided port, on all network interfaces.
 */
const start = async () => {
  try {
    await createDatabaseConnection();
    debug("Database is connected on port " + process.env.POSTGRES_PORT);
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  if (addr) {
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("App serveur is listening on " + bind);
  }
};

/**
 * Start the server
 */
start();
