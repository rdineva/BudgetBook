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

budget.get('/:budgetId', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const { budgetId } = req.params;
  const budget = await budgetController.getById(budgetId);
  res.json(budget);
});

budget.delete('/:budgetId', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const { budgetId } = req.params;
  await budgetController.deleteById(budgetId);
  res.json(`Budget with id = ${budgetId} was successfully deleted.`);
});

budget.post('/', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const { body } = req;
  const newBudget = await budgetController.create(body);
  console.log(`Created new budget with name: ${newBudget.name}`);
  res.json(newBudget);
});

budget.put('/:budgetId', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const { body } = req;
  const { budgetId } = req.params;
  await budgetController.update(budgetId, body);
  res.json(`Update budget with id = ${budgetId}`);
});

export default budget;