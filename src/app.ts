import dotenv from "dotenv";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "./config/session";
import Router from "./routes/index";
// import { init } from "./config/postgres";

// Connect to Postgres
// init();

export default class App {
  private app = express();

  constructor(port: string) {
    dotenv.config();
    // if you run behind a proxy (e.g. nginx)
    // this.app.set("trust proxy", 1);

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));

    //Configure the Session middleware
    this.app.use(session);

    const router = new Router();
    this.app.use("/", router.getRouter());

    this.app.set("port", port);
  }

  public getApp() {
    return this.app;
  }
}
