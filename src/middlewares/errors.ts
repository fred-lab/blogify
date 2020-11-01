import { Request, Response, NextFunction } from "express";
import HttpException from "src/exception/HttpException";
import { errors } from "../config/logger";
import createDebug from "debug";

const debug = createDebug("blogify:errors");

/**
 * A middleware to intercept errors. If the environnement is defined to "Production",
 * log the error in the errors.log, otherwise display the error in the terminal
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    process.env.NODE_ENV === "development"
      ? debug(`${err.type} ${err.code} : ${err.stack}`)
      : errors.log({ level: err.level, message: err.message });
    next(err);
  }
  next();
};

export { errorHandler };
