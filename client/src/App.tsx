import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import CustomAppBar from './components/app-bar';
import BudgetCreate from './containers/budget/budget-create';
import rootReducer from './store';
import BudgetEdit from './containers/budget/budget-edit';
import BudgetList from './containers/budget/budget-list';
import BudgetView from './containers/budget/budget-view';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <CustomAppBar />
        <Switch>
          <Route path="/budgets/create" exact component={BudgetCreate} />
          <Route path="/budgets/:id/edit" exact component={BudgetEdit} />
          <Route path="/budgets/:id/view" exact component={BudgetView} />
          <Route path="/" exact component={BudgetList} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
