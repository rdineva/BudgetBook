import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAppState from '../../hooks/use-app-state';
import { selectBudget, getCurrencies } from '../../store/budgets/actions';
import BudgetViewComponent from '../../components/budget/budget-view';
import { RouteComponentProps } from 'react-router';
import { BudgetCurrencyRates } from '../../entities/budget-currency-rates';

export default function BudgetView(props: RouteComponentProps<{ id: string }>) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const selectedBudget: BudgetCurrencyRates = useAppState(state => state.budgets.selectedBudget);
  const currencies = useAppState(state => state.budgets.currencies);
  
  useEffect(() => {
    dispatch(selectBudget(id));
  }, [id]);


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
