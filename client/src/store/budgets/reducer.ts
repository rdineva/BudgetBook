import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { BudgetsAction, actions } from './actions';
import { Budget } from '../../entities/budget';
import { CurrencyRates } from '../../entities/currency-rates';

function selectedBudget(state: Budget = null, action: BudgetsAction): Budget {
  switch (action.type) {
    case getType(actions.selectBudget):
      return action.payload;
    default:
      return state;
  }
}

function budgets(state: Budget[] = [], action: BudgetsAction): Budget[] {
  switch (action.type) {
    case getType(actions.loadBudgets.success):
      return action.payload;
    default:
      return state;
  }
}

function createdBudget(state: Budget = null, action: BudgetsAction): Budget {
  switch (action.type) {
    case getType(actions.createBudget.success):
      return action.payload;
    default:
      return state;
  }
}

function editedBudget(state: Budget = null, action: BudgetsAction): Budget {
  switch (action.type) {
    case getType(actions.editBudget.success):
      return action.payload;
    default:
      return state;
  }
}

function currencies(state: string[] = [], action: BudgetsAction): string[] {
  switch (action.type) {
    case getType(actions.getCurrencies):
      return action.payload;
    default:
      return state;
  }
}

function currencyRates(state: CurrencyRates = null, action: BudgetsAction): CurrencyRates {
  switch (action.type) {
    case getType(actions.getCurrencyRates):
      return action.payload;
    default:
      return state;
  }
}

function deletedBudget(state: string = null, action: BudgetsAction): string {
  switch (action.type) {
    case getType(actions.deleteBudget):
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  selectedBudget,
  budgets,
  createdBudget,
  editedBudget,
  currencies,
  currencyRates,
  deletedBudget
});
