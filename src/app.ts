import dotenv from "dotenv";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "./config/session";
import Router from "./routes/index";
import "reflect-metadata";
import morgan from "morgan";
import { access } from "./config/logger";
import { errorHandler } from "./middlewares/errors";
import cors from "cors"

dotenv.config();
const app = express();
// if you run behind a proxy (e.g. nginx)
// app.set("trust proxy", 1);

app.use(cors({
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

process.env.NODE_ENV === "development"
  ? app.use(morgan("dev"))
  : app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => {
            access.info(message.trim());
          },
        },
      })
    );

//Configure the Session middleware
declare module 'express-session' {
  export interface SessionData {
    isAuth: boolean;
  }
}
app.use(session);

const router = new Router();
app.use("/", router.getRouter());

app.use(errorHandler);

export default app;
