import { ThunkDispatch } from 'redux-thunk';
import { createAsyncAction, ActionType, createStandardAction } from 'typesafe-actions';
import { Budget } from '../../entities/budget';
import { httpService } from '../../services/http';

export const actions = {
  selectBudget: createStandardAction(
    '@budgets/selectBudget',
  )
    <Budget>(),
  loadBudgets: createAsyncAction(
    '@budgets/loadBudgetsRequest',
    '@budgets/loadBudgetsSuccess',
    '@budgets/loadBudgetsFailure',
  )
    <void, Array<Budget>, Error>(),
  createBudget: createAsyncAction(
    '@budgets/createBudgetRequest',
    '@budgets/createBudgetSuccess',
    '@budgets/createBudgetFailure',
  )
    <void, Budget, Error>(),
};

export function loadBudgets() {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.loadBudgets.request);
    try {
      const budgets = await httpService.get('budgets');
      dispatch(actions.loadBudgets.success(budgets));
    } catch (error) {
      dispatch(actions.loadBudgets.failure);
    }
  };
}

export function selectBudget(id: string) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const budget: Budget = await httpService.get(`budgets/${id}`);
    dispatch(actions.selectBudget(budget));
  };
}

export function createBudget(data: any) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.createBudget.request);
    try {
      const newBudget: Budget = await httpService.post('budgets/', data, {
        mode: 'no-cors',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          // 'Access-Control-Request-Headers': '*',
          // 'Access-Control-Request-Method': '*',
        },
      });

      dispatch(actions.createBudget.success(newBudget));
    } catch (error) {
      dispatch(actions.createBudget.failure);
    }
  };
}

export type BudgetsAction = ActionType<typeof actions>;
