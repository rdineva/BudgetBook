import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import UserController from '../controllers/user';
import getConnection from '../middleware/connection';

const user = express.Router({ mergeParams: true });

const getuserController = (req: Request, res: Response, next: () => void): void => {
  const { connection } = res.locals;
  const userController = new UserController(connection);
  res.locals.userController = userController;
  next();
};

user.use(getConnection);
user.use(getuserController);

user.get('/:userId', async (req: Request, res: Response) => {
  const { userController } = res.locals;
  const { userId } = req.params;
  const user = await userController.getById(userId);
  res.json(user);
});

user.delete('/:userId', async (req: Request, res: Response) => {
  const { userController } = res.locals;
  const { userId } = req.params;
  await userController.deleteById(userId);
  res.json(`User with id = ${userId} was successfully deleted.`);
});

user.post('/', async (req: Request, res: Response) => {
  const { userController } = res.locals;
  const { body } = req;
  const newuser = await userController.create(body);
  console.log(`Created new user with name: ${newuser.name}`);
  res.json(newuser);
});

user.put('/:userId', async (req: Request, res: Response) => {
  const { userController } = res.locals;
  const { body } = req;
  const { userId } = req.params;
  await userController.update(userId, body);
  res.json(`Update user with id = ${userId}`);
});

export default user;