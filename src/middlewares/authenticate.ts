import { Request, Response, NextFunction } from "express";

/**
 * Check if the request is authenticate or not
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.isAuth) {
    const err = new Error("Not Authenticate");
    res.status(401);
    next(err);
  }
  next();
};

export { isAuthenticate };
