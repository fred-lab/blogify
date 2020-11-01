import express from "express";
import { homepage } from "../controllers/homepage";
import { login, logout, create, user } from "../controllers/user";
import { isAuthenticate } from "../middlewares/authenticate";

export default class Routes {
  private router = express.Router();

  constructor() {
    this.publicRoutes();
    this.privateRoute();
  }

  private publicRoutes(): void {
    /* GET home page. */
    this.router.get("/", homepage);
    /* POST User login */
    this.router.post("/login", login);
    /* POST Create user */
    this.router.post("/user", create);
  }

  private privateRoute(): void {
    // /** Protected routes */
    this.router.use(isAuthenticate);

    // /** GET User logout */
    this.router.get("/logout", logout);

    /* GET Find an user */
    this.router.get("/user/:id", user);
  }

  public getRouter(): any {
    return this.router;
  }
}
