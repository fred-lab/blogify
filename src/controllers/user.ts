import { NextFunction, Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user";
import createDebug from "debug";

const debug = createDebug("blogify:UserController");

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role, isActive } = req.body;
    const em = getManager();

    const user = new User();
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    user.password = password;
    user.role = role;
    user.isActive = isActive;

    await em.save(user);

    return res.status(201).json("User created successfully");
  } catch (error) {
    return res.status(404).json(`Unable to create the user. ERROR n° ${error.code} = ${error}. ${error.detail}`);
  }
};

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

export { login, logout, create };
