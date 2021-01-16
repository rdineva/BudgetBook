import { combineReducers } from 'redux';
import budgetsReducer from './budgets/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  budgets: budgetsReducer,
  users: usersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;