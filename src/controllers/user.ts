import { NextFunction, Request, Response } from "express";
import createDebug from "debug";

const debug = createDebug("blogify:server");

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  debug("login", email, password);

  // Set data you want to have in the session
  if (req.session) {
    req.session.isAuth = true;
  }

  return res.json({ message: "Authenticated" });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session!.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.json({ message: "Logout successfully" });
  });
};

export { login, logout };
