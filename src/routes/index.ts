import express from "express";
// const router = express.Router();
// import debug from ("debug")("blogify:server");
import { homepage } from "../controllers/homepage";
import { login, logout } from "../controllers/user";
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
  }

  private privateRoute(): void {
    // /** Protected routes */
    this.router.use(isAuthenticate);

    // /** GET User logout */
    this.router.get("/logout", logout);

    // /** test */
    // this.router.get("/test", (req, res) => {
    //   debug("auth res", req.session);

    //   return res.json("auth route");
    // });
  }

  public getRouter(): any {
    return this.router;
  }
}
