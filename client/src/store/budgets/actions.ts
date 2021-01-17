import { ThunkDispatch } from 'redux-thunk';
import { createAsyncAction, ActionType, createStandardAction } from 'typesafe-actions';
import { Budget } from '../../entities/budget';
import { CurrencyRates } from '../../entities/currency-rates';
import httpService from '../../services/http';

export const actions = {
  selectBudget: createStandardAction(
    '@budgets/selectBudget',
  )
    <Budget>(),
  getCurrencies: createStandardAction(
    '@budgets/getCurrencies',
  )
    <Array<string>>(),
  getCurrencyRates: createStandardAction(
    '@budgets/getCurrencyRates',
  )
    <CurrencyRates>(),
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
    editBudget: createAsyncAction(
      '@budgets/editBudgetRequest',
      '@budgets/editBudgetSuccess',
      '@budgets/editBudgetFailure',
    )
    <void, Budget, Error>(),
  deleteBudget: createStandardAction(
    '@budgets/deleteBudget',
  )
  <string>(),
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
    const result: Budget = await httpService.get(`budgets/${id}`);
    dispatch(actions.selectBudget(result));
  };
}

export function createBudget(data: any) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.createBudget.request);
    try {
      const newBudget: Budget = await httpService.post('budgets/', data);

      dispatch(actions.createBudget.success(newBudget));
    } catch (error) {
      dispatch(actions.createBudget.failure);
    }
  };
}

export function editBudget(data: any) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(actions.editBudget.request);
    try {
      const editedBudget: Budget = await httpService.put(`budgets/${data.id}`, data);

      dispatch(actions.editBudget.success(editedBudget));
    } catch (error) {
      dispatch(actions.editBudget.failure);
    }
  };
}

export function getCurrencies() {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const currencies: string[] = await httpService.get(`budgets/currencies`);
    dispatch(actions.getCurrencies(currencies));
  };
}

export function getCurrencyRates() {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const currencyRates: CurrencyRates = await httpService.get(`budgets/currencyRates`);
    dispatch(actions.getCurrencyRates(currencyRates));
  };
}

export function deleteBudget(id: string) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const result: string = await httpService.delete(`budgets/${id}`);
    dispatch(actions.deleteBudget(result));
  };
}

export type BudgetsAction = ActionType<typeof actions>;
