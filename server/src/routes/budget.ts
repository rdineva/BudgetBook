import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import BudgetController from '../controllers/budget';
import getConnection from '../middleware/connection';
import fetch from 'node-fetch';
import * as _ from 'lodash';

const budget = express.Router({ mergeParams: true });

const getBudgetController = (req: Request, res: Response, next: () => void): void => {
  const { connection } = res.locals;
  const budgetController = new BudgetController(connection);
  res.locals.budgetController = budgetController;
  next();
};

budget.use(getConnection);
budget.use(getBudgetController);


budget.get('/currencies', async (req: Request, res: Response) => {
  fetch('https://api.exchangeratesapi.io/latest')
    .then((resp) => resp.json())
    .then((data) => {
      let currencies = [];
      _.reduce(data.rates, (_obj, _value, key) => currencies.push(key));
      currencies.push('EUR');
      res.json(currencies);
    });
});

budget.get('/:budgetId', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const { budgetId } = req.params;
  const budget = await budgetController.getById(budgetId);
  fetch(`https://api.exchangeratesapi.io/latest?base=${budget.currency}`)
    .then((resp) => resp.json() )
    .then((currencyRates) => res.json({budget, currencyRates}))
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
  console.log(newBudget)
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

budget.get('/', async (req: Request, res: Response) => {
  const { budgetController } = res.locals;
  const budget = await budgetController.getAll();
  res.json(budget);
});

export default budget;