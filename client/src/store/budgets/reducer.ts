import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { BudgetsAction, actions } from './actions';
import { Budget } from '../../entities/budget';

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

export default combineReducers({
  selectedBudget,
  budgets,
  createdBudget,
  editedBudget,
  currencies,
});
