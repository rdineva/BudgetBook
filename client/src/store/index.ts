import { combineReducers } from 'redux';
import budgetsReducer from './budgets/reducer';

const rootReducer = combineReducers({
  budgets: budgetsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;