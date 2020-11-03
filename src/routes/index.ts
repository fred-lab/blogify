import express from 'express';
import { homepage } from '../controllers/homepage';
import { login, logout, create, user } from '../controllers/user';
import { isAuthenticate } from '../middlewares/authenticate';

export default class Routes {
  private router = express.Router();

  constructor() {
    this.publicRoutes();
    this.privateRoute();
  }

  private publicRoutes(): void {
    /* GET home page. */
    this.router.get('/', homepage);
    /* POST User login */
    this.router.post('/api/login', login);
    /* POST Create user */
    this.router.post('/api/user', create);
  }

  private privateRoute(): void {
    // /** Protected routes */
    this.router.use(isAuthenticate);

    // /** GET User logout */
    this.router.get('/api/logout', logout);

    /* GET Find an user */
    this.router.get('/api/user/:id', user);
  }

  public getRouter(): any {
    return this.router;
  }
}
