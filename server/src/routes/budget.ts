import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import BudgetController from '../controllers/budget';
import getConnection from '../middleware/connection';

const budget = express.Router({ mergeParams: true });

const getBudgetController = (req: Request, res: Response, next: () => void): void => {
  const { connection } = res.locals;
  const budgetController = new BudgetController(connection);
  res.locals.budgetController = budgetController;
  next();
};

budget.use(getConnection);
budget.use(getBudgetController);

budget.get('/', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  
  // const {
  //   limit, offset, orderColumn, order,
  // } = req.query;

  // const publicFigures = await budgetController.getAll({
  //   limit, offset, orderColumn, order,
  // });

  // res.json(publicFigures);
});
