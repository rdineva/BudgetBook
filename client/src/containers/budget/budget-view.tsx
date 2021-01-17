import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { selectBudget, getCurrencies } from '../../store/budgets/actions';
import BudgetViewComponent from '../../components/budget/budget-view';
import { RouteComponentProps } from 'react-router';
import { Budget } from '../../entities/budget';

export default function BudgetView(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;

  const selectedBudget: {budget: Budget, currencyRates: JSON} = useAppState(state => state.budgets.selectedBudget);
  let budget = null;
  let currencyRates = null; 

  if (selectedBudget) {
    budget = selectedBudget[0];
    currencyRates = selectedBudget[1];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);

  const currencies = useAppState(state => state.budgets.currencies);

  useEffect(() => {
    dispatch(getCurrencies()); 
  }, []);

  return (
    <BudgetViewComponent 
      selectedBudget={selectedBudget}
      currencies={currencies}
    />
  );
}
