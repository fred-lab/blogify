import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/HttpException';
import { getManager, getRepository } from 'typeorm';
import { User } from '../entity/user';
import { authenticate } from '../services/security';

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

    return res.status(201).json('User created successfully');
  } catch (error) {
    if (error instanceof HttpException){
      return res
        .status(404)
        .json(
          `Unable to create the user. ERROR n° ${error.code} = ${error}. ${error.message}`,
        );
    }
    return res.status(404)
    .json(
      `Unable to create the user.`,
    );
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getRepository(User).findOne({ where: { email: email } });

    if (user) {
      const isAuth = await authenticate(password, user);
      if (!user.isActive) {
        return res
          .status(404)
          .json({ message: "User's account is not activated." });
      }
      // Set data you want to have in the session
      if (req.session && isAuth) {
        req.session.isAuth = true;
        return res.json({
          message: 'Authenticated',
          user: {
            isAuth: true,
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        return res.status(404).json({ message: 'Not Authenticated.' });
      }
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Unabled to authenticate this user.' });
  }
};

const user = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getRepository(User).findOneOrFail(id);

    if (user) {
      return res.json({
        user: {
          id: user.id,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Unabled to authenticate this user.' });
  }
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session!.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.json({ message: 'Logout successfully' });
  });
};

export { login, logout, create, user };
